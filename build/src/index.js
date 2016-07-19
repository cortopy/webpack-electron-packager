"use strict";
var fs = require("fs"), path = require("path"), electronPackager = require("electron-packager"), colors = require("colors/safe"), exec = require("child_process").exec;
var WebpackElectronPackager = (function () {
    function WebpackElectronPackager(opts) {
        this.defaultIgnores = [
            "/node_modules/webpack-electron-packager($|/)",
            "/node_modules/electron-reload($|/)"];
        this.opts = this.hyphenateKeys(opts);
        this.opts.ignore = this.concatDefaults(this.toArrifExist(this.opts.ignore), this.defaultIgnores);
    }
    WebpackElectronPackager.prototype.apply = function (compiler) {
        var _this = this;
        var externals = this.toArrifExist(this.opts.externals);
        compiler.plugin("after-emit", function () {
            electronPackager(_this.opts, done);
            function done(err, data) {
                var modules = [];
                if (err)
                    throw Error(colors.red("[webpack-electron-packager]: " + err.message));
                if (externals)
                    modules.push.apply(modules, externals.map(function (m) { return fs.realpathSync(path.resolve("node_modules", m)); }));
                if (modules.length > 0) {
                    var npmInstall = "npm install " + modules.join(" ");
                    exec(npmInstall, { cwd: compiler.options.output.path }, function (error, stdout, stderr) {
                        console.log("stdout: " + stdout);
                        console.log("stderr: " + stderr);
                        if (error !== null) {
                            console.log("exec error: " + error);
                        }
                    });
                }
                return data;
            }
        });
    };
    return WebpackElectronPackager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WebpackElectronPackager;
module.exports = WebpackElectronPackager;
//# sourceMappingURL=index.js.map