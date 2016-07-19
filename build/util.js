"use strict";
var _ = require("lodash");
function hyphenateKeys(opts) {
    return _.mapKeys(opts, function (value, key) {
        return key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    });
}
exports.hyphenateKeys = hyphenateKeys;
function toArrIfExist(k) {
    if (k)
        return Array.isArray(k) ? k : [k];
}
exports.toArrIfExist = toArrIfExist;
function concatDefaults(d, a) {
    return (a) ? d.concat(a) : d;
}
exports.concatDefaults = concatDefaults;
//# sourceMappingURL=util.js.map