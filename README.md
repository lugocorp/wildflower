<img src="./www/assets/logo.svg" width="150px" height="150px"/>

# Wildflower
**version** 1.0

Wildflower is a lightweight, open source mobile game library and framework built on top of Apache Cordova.
The project acts as a jumping off point for mobile game developers who want to make 2D games using TypeScript.
The Wildflower library includes such features as:
- TypeScript configuration for Apache Cordova
- `async`/`await` - based asset loading
- Easy way to use spritesheets
- Automatic mapping between game coordinates and display coordinates

## Getting started
Download the code from this repository to start a new Wildflower project.
Then, run the following commands:

```bash
npm install # Installs dependencies
npm install -g cordova # Installs a helpful tool for later
```

This repository comes with boilerplate code to help get you started (see the `src` folder).
You can compile or interactively run your project at any point by using either:

```bash
npm run build # Builds your project, or
npm start # Serves your project at http://localhost:8080
```

You can lint your TypeScript code with the following command:
```bash
npm run lint
```

## Staying up to date
You should not need to pull future commits from this repository.
If you would like to upgrade to a newer version of the Wildflower library, simply run the following:

```bash
npm run upgrade
```

This command will upgrade your local copy of the Wildflower library.
Configuration such as `package.json` or `webpack.config.js` will not be affected by the upgrade script.

## Documentation

### enum MouseType
An enum with the options of `MOVE`, `UP` and `DOWN`.

### enum KeyType
An enum with the options of `UP` and `DOWN`.

### interface ImageAsset
This type represents a loaded image asset.
It has the following fields:
- **element**: `HTMLImageElement`

    The underlying image that this asset references

- **left**: `number`

    Refers to where this asset is focused on the image

- **top**: `number`

    Refers to where this asset is focused on the image

- **width**: `number`

    Refers to the width of this asset

- **height**: `number`

    Refers to the height of this asset

### class View
This class helps structure your app.
You override it to define each of the unique screens for your game.
It has several methods that Wildflower will handle calling for you.

#### async handleStart (): `Promise<void>`
This function runs whenever your view becomes active.
You can place setup code here, such as loading assets.

#### handleMouse (type: `MouseType`, x: `number`, y: `number`): `void`
This function gets fired whenever the player does something with the mouse (specifically pressing down or up or moving it).

#### handleKey (type: `KeyType`, key: `string`): `void`
This function fires whenever the player presses a key down or up.

#### handleFrame (ctx: `CanvasRenderingContext2D`, delta: `number`): `void`
This function should implement your view's frame update and draw logic.
It can be triggered by calling your game's `frame()` function.

## Contact
This software was developed by [LugoCorp](http://lugocorp.net).
Contact information can be found on our website.
For issues and suggestions, please make a pull request or notify us on GitHub.