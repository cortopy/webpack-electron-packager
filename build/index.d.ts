import { OptionsI } from "./typings.d";
export default class WebpackElectronPackager {
    private externals;
    private outputPath;
    private opts;
    private defaultIgnores;
    constructor(opts: OptionsI);
    apply(compiler: any): void;
    done(err: Error, data: any): any;
}
