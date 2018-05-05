/**
 *   Check if an option has been provided in webpack config files
 *   If it exists, return the value as array
 *   Otherwise, return undefined.
 *
 *   @param  {string | string[]}    k   - Key of Webpack option
 *   @return {string[]}                 - Value[] | Undefined
 */
export declare function toArrIfExist(k: string | string[]): string[];
/**
 *   Concatenate defaults[] to a given Array
 *   If there's no array, return defaults[] only
 *
 *   @param  {string[]} d   - Array with default values
 *   @param  {string[]} a   - Original array of values
 *   @return {string[]}     - (d + a) - d
 */
export declare function concatDefaults(d: string[], a: string[]): string[];
