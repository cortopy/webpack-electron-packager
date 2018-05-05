"use strict";
process.env.NODE_ENV = "testing";
const fs = require("fs");
const path = require("path");
const child_process_1 = require("child_process");
const rimraf = require("rimraf");
const chai = require("chai");
const electronPackager = require("electron-packager");
const WebpackElectronPackager = require("../build/index");
chai.should();
const options = {
    externals: "my-npm-module",
    electronPackagerOptions: {
        dir: "/path/doesnt/exist",
        name: "app",
        arch: "x64",
        platform: "linuxify",
        version: ""
    }
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
        // module doesn't exist, test with RegExp
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
describe("WEBPACK INTEGRATION", function () {
    this.timeout(10000);
    before(done => {
        child_process_1.exec("./node_modules/.bin/webpack --config "
            + path.resolve(__dirname, "config/webpack.spec.js"), (err, data) => {
            if (err)
                console.error(err);
            done();
        });
    });
    after(done => {
        rimraf(path.resolve(__dirname, "testBuild-linux-x64"), (err) => {
            if (err)
                console.error(err);
            done();
        });
    });
    it("should build electron app with basic webpack config", () => {
        const stat = fs.statSync(path.resolve(__dirname, "testBuild-linux-x64/testBuild"));
        return stat.isFile().should.be.true;
    });
});
