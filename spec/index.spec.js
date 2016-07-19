"use strict";
process.env.NODE_ENV = "testing";
const chai = require("chai");
const electronPackager = require("electron-packager");
const WebpackElectronPackager = require("../build/index");
chai.should();
var options = {
    dir: "/path/doesnt/exist",
    arch: 8,
    platform: "linuxify",
    externals: "my-npm-module"
};
describe("VALIDATION", () => {
    it("cascades to electron-packager validation when a value is not valid", () => {
        function test() {
            var validation = new WebpackElectronPackager(options);
            return electronPackager(validation.opts, (err, data) => data);
        }
        test.should.throw(TypeError);
    });
});
describe("EXTERNALS", () => {
    it("should create command to install Webpack externals", () => {
        function test() {
            var plugin = new WebpackElectronPackager(options);
            var pluginCallback = plugin.done.apply(plugin);
            var result = pluginCallback(undefined);
            return result;
        }
        test.should.throw(new RegExp(options.externals));
    });
    it("should throw Error if electron-packager fails", () => {
        function test() {
            var plugin = new WebpackElectronPackager(options);
            var result = plugin.done(new Error);
            return result;
        }
        test.should.throw(Error, /\[webpack-electron-packager\]/);
    });
});
