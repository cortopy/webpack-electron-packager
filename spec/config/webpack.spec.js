"use strict";
const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ElectronPackager = require("../../build");
const _testConfig = path.resolve(__dirname, "../..");
function root(...args) {
    return path.join(_testConfig, ...args);
}
module.exports = {
    target: "electron",
    context: root("spec/config"),
    entry: ["main"],
    output: {
        filename: "[name].js",
    },
    resolve: {
        extensions: [".js"],
        modules: [root("spec/config"), root("node_modules")],
    },
    module: {
        rules: [{ test: /\.html$/, use: "html-loader" }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new CopyWebpackPlugin([{
                from: "package.json",
                to: "spec/build/package.json"
            }, {
                from: "index.html",
                to: "spec/build/index.html"
            }]),
        new ElectronPackager({
            electronPackagerOptions: {
                dir: root("spec/build"),
                arch: "x64",
                name: "testBuild",
                platform: "linux",
                overwrite: true,
                out: root("spec")
            }
        })
    ],
    externals: [
        (function () {
            // list all node modules which will create problems with webpack
            // e.g.: npm link modules, those with make-like build patterns
            let IGNORES = [
                "electron-reload",
            ];
            return function (context, request, callback) {
                if (IGNORES.indexOf(request) >= 0)
                    return callback(null, "require('" + request + "')");
                return callback();
            };
        })(),
    ],
    node: {
        __dirname: false,
        __filename: false,
        clearImmediate: false,
        crypto: "empty",
        global: false,
        module: false,
        // process: true,
        setImmediate: false,
    }
};
