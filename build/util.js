"use strict";
const _ = require("lodash");
/**
 *   Check if an option has been provided in webpack config files
 *   If it exists, return the value as array
 *   Otherwise, return undefined.
 *
 *   @param  {string | string[]}    k   - Key of Webpack option
 *   @return {string[]}                 - Value[] | Undefined
 */
function toArrIfExist(k) {
    if (k)
        return Array.isArray(k) ? k : [k];
}
exports.toArrIfExist = toArrIfExist;
/**
 *   Concatenate defaults[] to a given Array
 *   If there's no array, return defaults[] only
 *
 *   @param  {string[]} d   - Array with default values
 *   @param  {string[]} a   - Original array of values
 *   @return {string[]}     - (d + a) - d
 */
function concatDefaults(d, a) {
    return (a) ? d.concat(a) : d;
}
exports.concatDefaults = concatDefaults;
//# sourceMappingURL=util.js.map