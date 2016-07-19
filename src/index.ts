const fs = require("fs"),
    path = require("path"),
    electronPackager = require("electron-packager"),
    colors = require("colors/safe"),
    spawn = require("child_process").exec;

import {OptionsI} from "./typings.d";
import {hyphenateKeys,
    toArrIfExist,
    concatDefaults} from "./util";

export default class WebpackElectronPackager {
    private externals: string[];
    private outputPath: string;
    private opts: OptionsI;
    private defaultIgnores: string[] = [
        "/node_modules/webpack-electron-packager($|/)",
        "/node_modules/electron-reload($|/)"];

    constructor(opts: OptionsI) {
        // Let electronp-packages validate the opts object
        // But first convert all keys to right format
        this.opts = hyphenateKeys(opts);
        // tslint:disable-next-line:no-unused-expression
        this.externals = toArrIfExist(this.opts.externals);

        // Node_modules shouldn't be added with electron-packager
        // If for some unknown reason a config setting overrides, this adds default ignores too
        this.opts.ignore = concatDefaults(
            this.defaultIgnores,
            toArrIfExist(this.opts.ignore));
    }

    apply(compiler) {
        // tslint:disable-next-line:no-unused-expression
        this.outputPath = compiler.options.output.path;
        var cb = this.done;
        compiler.plugin("after-emit", () => electronPackager(this.opts, cb.bind(this)));
    }

    /**
     *   Install Webpack modules
     *   This is a callback separated from class for easier testing
     *   @param  {Error}      - err
     *   @param  {any} data   - electron-packager output
     *   @return {any} data   - electron-packager output
     */
    done(err: Error, data) {
        let modules = [];

        if (err) throw Error(colors.red("[webpack-electron-packager]: " + err.message));
        // Map each webpack external to its real path
        // and concat to list of modules to install
        if (this.externals) modules.push(...this.externals.map(m =>
            fs.realpathSync(path.resolve("node_modules", m)
            )));
        // Install externals
        if (modules.length > 0) {
            // let npmInstall = "npm install " + modules.join(" ");
            spawn("npm",
                ["install", modules],
                { cwd: this.outputPath });
        }
        return data;
    }
}

// Export as a node module
module.exports = WebpackElectronPackager;
