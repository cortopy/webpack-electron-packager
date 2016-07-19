const _ = require("lodash");

import {OptionsI} from "./typings.d";

/**
 *   Perform a quick formatting for the options object.
 *   This module accepts either hyphens or CamelCase keys,
 *   but electron-packager only accepts the latter
 *
 *   @param  {[type]}   opts - Options as per electron-packager
 *   @return {OptionsI}      - Same object with hyphenated keys
 */
export function hyphenateKeys(opts): OptionsI {
    return _.mapKeys(opts, (value, key) => {
        return key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    });
}

/**
 *   Check if an option has been provided in webpack config files
 *   If it exists, return the value as array
 *   Otherwise, return undefined.
 *
 *   @param  {string | string[]}    k   - Key of Webpack option
 *   @return {string[]}                 - Value[] | Undefined
 */
export function toArrIfExist(k: string | string[]): string[] {
    if (k) return Array.isArray(k) ? k : [k];
}

/**
 *   Concatenate defaults[] to a given Array
 *   If there's no array, return defaults[] only
 *
 *   @param  {string[]} d   - Array with default values
 *   @param  {string[]} a   - Original array of values
 *   @return {string[]}     - (d + a) - d
 */
export function concatDefaults(d: string[], a: string[]): string[] {
    return (a) ? d.concat(a) : d;
}
