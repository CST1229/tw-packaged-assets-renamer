# TurboWarp Packaged Assets Renamer

Renames asset files in a packaged TurboWarp project to match their sprite and costumes/sound names, as well as any folders made using the Sprite folders addon, instead of their normal random-ish names.

This may cause duplicate files to be created if 2 assets are identical, which could slightly increase the project's filesize. It might also not work well with other tools (like the unpackager, though it's still possible to get project files back by modifying the unpackager).

## Usage

First, package your project to a zip or Electron (or any other environment that has separate asset files) and extract it; that folder will be where you run the script.

This script uses [Node.js](https://nodejs.org/), so install that first.

Download the [renamer.mjs](https://github.com/CST1229/tw-packaged-assets-renamer/blob/main/renamer.mjs) file from this repository and put it into your project's folder. Afterwards, you have 2 methods:

### Easier method (Windows only)

1. Open File Explorer and navigating to your project folder.
2. Click the "address bar" (which shows you the current folder you're in) and enter `node renamer.mjs` into it, then press Enter to run that command.
3. You might also want to delete the downloaded script afterwards.

### Harder method

1. Open a terminal in that folder. On Windows you can do this by opening File Explorer, navigating to your project folder, clicking the "address bar" (which shows you the current folder you're in) and entering `cmd` into it, then pressing Enter.
2. Run `node renamer.mjs` in the terminal to run the script.
3. You might also want to delete the downloaded script afterwards.

## Parameters (advanced)

There are some additional command line arguments you can give:
- `--advanced` - Remove waiting for error messages. Use if you're running this script in a terminal.
- `--json [file]` - Specify a direct path to a project.json file instead of searching in your current directory.
- `--obfuscate` - Instead of properly naming assets, randomize their names (like vanilla but actually randomized instead of based on the asset content), and also remove their original filenames from the project.json.