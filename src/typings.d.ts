export enum Platform {
    darwin,
    linux,
    mas,
    win32,
    all
}

export enum Arch {
    ia32,
    x64,
    all
}

export interface DownloadOptions {
    cache: string;
    mirror: string;
    strictSsl: boolean;
}

export interface OsxSignOptions {
    identity: string;
    entitlements: string;
    entitlementsInherit: string;
}

export interface DarwinOptions {
    appBundleId: string;
    appCategoryType: string;
    extendInfo: string;
    extraResource: string;
    helperBundleId: string;
    osxDesign: boolean | OsxSignOptions;
}

export interface Win32Options {
    versionString: string;
}

export interface asarOptions {
    ordering: string;
    unpack: string;
    unpackDir: string;
}

export interface OptionsI {
    arch?: Arch | Arch[];
    dir: string;
    platform?: Platform | Platform[];
    afterExtract?: any;
    all?: boolean;
    appname?: string;
    appCopyright?: string;
    appVersion?: string;
    asar?: boolean | asarOptions;
    buildVersion?: string;
    derefSymlinks?: boolean;
    download?: DownloadOptions;
    externals?: string[] | string;
    icon?: string;
    ignore?: string[] | string;
    name?: string;
    out?: string;
    overwrite?: string;
    prune?: boolean;
    tmpdir?: boolean | string;
    version?: string;
    darwin?: DarwinOptions;
    win32?: Win32Options;
}
