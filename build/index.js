"use strict";
var fs = require("fs"), path = require("path"), electronPackager = require("electron-packager"), colors = require("colors/safe"), spawn = require("child_process").exec;
var util_1 = require("./util");
var WebpackElectronPackager = (function () {
    function WebpackElectronPackager(opts) {
        this.defaultIgnores = [
            "/node_modules/webpack-electron-packager($|/)",
            "/node_modules/electron-reload($|/)"];
        this.opts = util_1.hyphenateKeys(opts);
        this.externals = util_1.toArrIfExist(this.opts.externals);
        this.opts.ignore = util_1.concatDefaults(this.defaultIgnores, util_1.toArrIfExist(this.opts.ignore));
    }
    WebpackElectronPackager.prototype.apply = function (compiler) {
        var _this = this;
        this.outputPath = compiler.options.output.path;
        var cb = this.done;
        compiler.plugin("after-emit", function () { return electronPackager(_this.opts, cb.bind(_this)); });
    };
    WebpackElectronPackager.prototype.done = function (err, data) {
        var modules = [];
        if (err)
            throw Error(colors.red("[webpack-electron-packager]: " + err.message));
        if (this.externals)
            modules.push.apply(modules, this.externals.map(function (m) {
                return fs.realpathSync(path.resolve("node_modules", m));
            }));
        if (modules.length > 0) {
            spawn("npm", ["install", modules], { cwd: this.outputPath });
        }
        return data;
    };
    return WebpackElectronPackager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WebpackElectronPackager;
module.exports = WebpackElectronPackager;
//# sourceMappingURL=index.js.map