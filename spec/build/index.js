"use strict";
var __assign = (this && this.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
const fs = require("fs");
const path = require("path");
const child_process_1 = require("child_process");
const electronPackager = require("electron-packager");
const colors = require("colors/safe");
const util_1 = require("./util");
class WebpackElectronPackager {
    constructor(opts) {
        this.defaultIgnores = [
            RegExp("/node_modules/webpack-electron-packager($|/)"),
            RegExp("/node_modules/electron-reload($|/)")
        ];
        // Node_modules shouldn't be added with electron-packager
        // If for some unknown reason a config setting overrides, this adds default ignores too
        // A function with a fix for lack of package.json will be passed to electron-packager
        this.packagerOpts = __assign({}, opts.electronPackagerOptions, { ignore: (path) => {
                if (path === "") {
                    console.log(colors.yellow("No package.json detected. Not passing it to electron-packager"));
                    return false;
                }
                else {
                    const userIgnores = this.packagerOpts.ignore;
                    if (userIgnores) {
                        if (typeof userIgnores === "function") {
                            const userIgnoresCb = userIgnores;
                            return userIgnoresCb(path);
                        }
                        else {
                            return this.defaultIgnores.concat(userIgnores).some(ign => ign.test(path));
                        }
                    }
                    ;
                }
            } });
        this.externals = util_1.toArrIfExist(opts.externals);
    }
    apply(compiler) {
        this.outputPath = compiler.options.output.path;
        var cb = this.done;
        compiler.plugin("after-emit", () => electronPackager(this.packagerOpts, cb.bind(this)));
    }
    /**
    *   Install Webpack modules
    *   This is a callback separated from class for easier testing
    *   @param  {Error}      - err
    *   @param  {any} data   - electron-packager output
    *   @return {any} data   - electron-packager output
    */
    done(err, data) {
        let modules = [];
        if (err)
            throw Error(colors.red("[webpack-electron-packager]: " + err.message));
        // Map each webpack external to its real path
        // and concat to list of modules to install
        if (this.externals)
            modules.push(...this.externals.map(m => fs.realpathSync(path.resolve("node_modules", m))));
        // Install externals
        if (modules.length > 0) {
            child_process_1.exec(`npm install ${modules.join(" ")}`, { cwd: this.outputPath });
        }
        return data;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WebpackElectronPackager;
// Export as a node module
module.exports = WebpackElectronPackager;
//# sourceMappingURL=index.js.map 
