# TurboWarp Packaged Assets Renamer

Renames asset files in a packaged TurboWarp project to match their sprite and costumes/sound names, as well as any folders made using the Sprite folders addon, and also updates the project.json file to point to the new paths.

This may cause duplicate files to be created if 2 assets are identical, which could slightly increase the project's filesize.

## Usage

First, package your project and extract it; that folder will be where you run the script.

This script uses [Node.js](https://nodejs.org/), so install that first.

Afterwards, you have 2 methods:

### Easier method (Windows only)

Open File Explorer, then navigate to your project's extracted folder.

Afterwards, click the address bar (which shows you the current folder name), then paste this in, and press Enter to download and run the script:

```
node -e "{}" --import=https://raw.githubusercontent.com/CST1229/tw-packaged-assets-renamer/master/renamer.mjs
```

### Slightly harder method

Download the `renamer.mjs` file from this repository and put it into your project's folder. Afterwards, open a terminal in that folder. On Windows you can do this by opening File Explorer, navigating to your project folder, clicking the "address bar" (which shows you the current folder you're in) and entering `cmd` into it, then pressing Enter.

Then, run `node renamer.mjs` in the terminal.

## Parameters (advanced)

There are some additional command line arguments you can give:
- `--advanced` - remove waiting for error messages. Use if you're running this script in a terminal.
- `--json [file]` - specify a direct path to a project.json file, instead of searching in your current directory