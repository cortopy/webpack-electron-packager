# Build Electron apps without the bloat

Webpack plugin to build Electron apps. It's particularly useful to package Electron Apps which only contain required modules and assets.

## Features

- Brings [electron-packager](https://github.com/electron-userland/electron-packager) to your Webpack dev flow.
- Supports Webpack `externals`.

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-plugins.html)

```
npm install webpack-electron-packager -D
```

And then, in your webpack config:

```javascript
const ElectronPackager = require("webpack-electron-packager");
module.exports = {
    plugins: [
        new ElectronPackager({
          dir: "/path/to/app",
          arch: "x64",
          platform: "linux",
        })
    ]
}
```

## Options

Plugin accepts all [options in electron-packager](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options). They can be passed in either CamelCase (e.g.: `buildVersion`) or with hyphens (e.g.: `build-version`).

Plugin also adds the following:

### externals

Sometimes, you may need to have libraries as externals. If that's the case, pass the name of the module or an array of modules as `externals`.

```javascript
const ElectronPackager = require("webpack-electron-packager");
module.exports = {
    plugins: [
        new ElectronPackager({
          ...
          externals: "my-npm-package"
        })
    ]
}
```

## Tests

```
npm test
```
