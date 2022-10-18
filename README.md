<img src="https://raw.githubusercontent.com/lugocorp/wildflower/main/media/logo.svg" height="150px"/>

</br>
</br>

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

## Contact
This software was developed by [LugoCorp](http://lugocorp.net).
Contact information can be found on our website.
For issues and suggestions, please make a pull request or notify us on GitHub.