import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";
import * as electronPackager from "electron-packager";
import * as colors from "colors/safe";

export type Options = Readonly<{
  externals?: string[] | string;
  electronPackagerOptions: ElectronPackager.Options
}>;

// #TODO:
// - packager types
// - clean up util
// - clean up tests index
// - clean up tests util
// - strict mode

export default class WebpackElectronPackager {
  private externals: string[];
  private outputPath: string;
  private packagerOpts: ElectronPackager.Options;
  private defaultIgnores: RegExp[] = [
    RegExp("/node_modules/webpack-electron-packager($|/)"),
    RegExp("/node_modules/electron-reload($|/)")
  ];

  constructor(opts: Options) {
    // Node_modules shouldn't be added with electron-packager
    // If for some unknown reason a config setting overrides, this adds default ignores too
    // A function with a fix for lack of package.json will be passed to electron-packager
    this.packagerOpts = {
      ...opts.electronPackagerOptions,
      ignore: (path: string) => {
        if (path === "") {
          console.log(colors.yellow("No package.json detected. Not passing it to electron-packager"));
          return false;
        } else {
          const userIgnores = opts.electronPackagerOptions.ignore;
          if (userIgnores) {
            if (typeof userIgnores === "function") {
              const userIgnoresCb = <(path: string) => boolean>userIgnores;
              return userIgnoresCb(path);
            } else {
              return this.defaultIgnores.concat(userIgnores).some(ign => ign.test(path));
            }
          };
        }
      }
    };
    this.externals = toArrIfExist(opts.externals);
  }

  apply(compiler) {
    console.log("compiler: ", compiler);
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
          exec(`npm install ${modules.join(" ")}`,
              { cwd: this.outputPath });
    }
    return data;
  }
}

/**
 *   Check if an option has been provided in webpack config files
 *   If it exists, return the value as array
 *   Otherwise, return undefined.
 *
 *   @param  {string | string[]}    k   - Key of Webpack option
 *   @return {string[]}                 - Value[] | Undefined
 */
function toArrIfExist(k: string | string[]): string[] {
    if (k) return Array.isArray(k) ? k : [k];
}
