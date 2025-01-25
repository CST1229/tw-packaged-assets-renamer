# TurboWarp Packaged Assets Renamer

Renames asset files in a packaged TurboWarp project to match their sprite and costumes/sound names, as well as any folders made using the Sprite folders addon, instead of their normal random-ish names.

This may cause duplicate files to be created if 2 assets are identical, which could slightly increase the project's filesize. It might also not work well with other tools.

## Usage

First, package your project to a zip or Electron (or any other environment that has separate asset files) and extract it; that folder will be where you run the script.

This script uses [Node.js](https://nodejs.org/), so install that first.

Afterwards:
1. Download the [renamer.mjs](https://github.com/CST1229/tw-packaged-assets-renamer/blob/main/renamer.mjs) file from this repository and put it into your project's folder.
2. Open a terminal in that folder. On Windows you can do this by opening File Explorer, navigating to your project folder, clicking the "address bar" (which shows you the current folder you're in) and entering `cmd` into it, then pressing Enter.
3. Run `node renamer.mjs` in the terminal to run the script.

## Parameters (advanced)

There are some additional command line arguments you can give:
- `--advanced` - remove waiting for error messages. Use if you're running this script in a terminal.
- `--json [file]` - specify a direct path to a project.json file, instead of searching in your current directory