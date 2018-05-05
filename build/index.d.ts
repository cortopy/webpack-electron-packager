export declare type Options = Readonly<{
    externals?: string[] | string;
    electronPackagerOptions: ElectronPackager.Options;
}>;
export default class WebpackElectronPackager {
    private externals;
    private outputPath;
    private packagerOpts;
    private defaultIgnores;
    constructor(opts: Options);
    apply(compiler: any): void;
    /**
    *   Install Webpack modules
    *   This is a callback separated from class for easier testing
    *   @param  {Error}      - err
    *   @param  {any} data   - electron-packager output
    *   @return {any} data   - electron-packager output
    */
    done(err: Error, data: any): any;
}
