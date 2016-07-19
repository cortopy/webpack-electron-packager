"use strict";
var _ = require("lodash");
function hyphenateKeys(opts) {
    return _.mapKeys(opts, function (value, key) {
        return key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    });
}
exports.hyphenateKeys = hyphenateKeys;
function toArrifExist(k) {
    if (k)
        return Array.isArray(k) ? k : [k];
}
exports.toArrifExist = toArrifExist;
function concatDefaults(a, d) {
    return (a) ? a.concat(d) : d;
}
exports.concatDefaults = concatDefaults;
//# sourceMappingURL=helpers.js.map