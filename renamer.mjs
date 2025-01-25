import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as process from "node:process";

function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
async function error(...msg) {
	console.error(...msg);
	if (!advancedMode) await sleep(5000);
	throw "";
}

let jsonDir = process.cwd();
let projectJsonName = null;
// disables handholding stuff
let advancedMode = false;

process.argv.map(arg => arg.toLowerCase()).forEach((arg, index) => {
	if (index < 2) return;
	if (arg === "--json") {
		projectJsonName = path.relative(jsonDir, process.argv[index + 1] || "project.json");
	} else if (arg === "--advanced") {
		advancedMode = false;
	}
});

if (!projectJsonName) {
	const files = await fs.readdir(jsonDir, {recursive: true});
	projectJsonName = files.find(f => f === "project.json" || f.endsWith("/project.json") || f.endsWith("\\project.json"));
	if (!projectJsonName) {
		await error(`project.json file not found anywhere in ${jsonDir}! Did you run this in the packaged project's folder?`);
	}
	projectJsonName = path.resolve(jsonDir, projectJsonName);
}
jsonDir = path.dirname(projectJsonName) + "/";

let json;
try {
	json = await fs.readFile(projectJsonName, {encoding: "utf-8"});
} catch (e) {
	await error("Could not read project.json file.", e);
}
try {
	json = JSON.parse(json);
} catch (e) {
	await error("project.json file seems to not be valid JSON.", e);
}

const promises = [];
const written = new Set();
const toDelete = new Set();
try {
	for (const target of json.targets) {
		const folder = uniqueFilename(jsonDir + sanitizeAssetName(target.name)) + "/";
		await fs.mkdir(folder, {recursive: true});
		for (const asset of target.costumes) {
			convertAsset(asset, folder);
		}
		for (const asset of target.sounds) {
			convertAsset(asset, folder);
		}
	}
	await Promise.all(promises);

	// delete old files, except written ones just in case
	promises.length = 0;
	for (const oldFile of toDelete) {
		if (!written.has(oldFile)) {
			promises.push(fs.rm(oldFile));
			console.log("Deleting:", oldFile.replace(jsonDir, ""));
		}
	}
	await Promise.all(promises);

} catch (e) {
	await error("An error occurred:", e);
}

async function convertAsset(asset, spriteFolder) {
	const oldFile = jsonDir + asset.md5ext;
	const newFile = uniqueFilename(spriteFolder + sanitizeAssetName(asset.name) + "." + asset.dataFormat);
	toDelete.add(oldFile);

	const dirlessName = newFile.replace(spriteFolder, "");
	asset.md5ext = dirlessName;
	asset.assetId = dirlessName.substring(0, dirlessName.length - path.extname(dirlessName).length);

	const assetDir = path.dirname(newFile);
	promises.push(fs.mkdir(assetDir, {recursive: true}).then(() => fs.copyFile(oldFile, newFile)));

	console.log("Copying:", oldFile.replace(assetDir, ""), "->", dirlessName);
}

function sanitizeAssetName(name) {
	return (name || "_")
		// kinda-dumb way to support addon folders
		.replaceAll("//", "[__FOLDER_PLACEHOLDER__]")
		.replaceAll(/[\/\\:?"<>*|&]/g, "_")
		.replaceAll("[__FOLDER_PLACEHOLDER__]", "/");
}
function uniqueFilename(filename) {
	const ext = path.extname(filename);
	const notExt = filename.substring(0, filename.length - ext.length);
	filename = notExt + ext;
	for (let i = 2; written.has(filename); i++) {
		filename = notExt + i + ext
	}
	written.add(filename);
	return filename;
}

try {
	await fs.writeFile(projectJsonName, JSON.stringify(json));
	console.log("Done.");
	if (!advancedMode) await sleep(500);
} catch (e) {
	await error("Could not write new project.json file:", e);
}