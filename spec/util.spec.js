"use strict";
process.env.NODE_ENV = "testing";
var chai = require("chai");
var util_1 = require("../build/util");
var should = chai.should, expect = chai.expect;
describe("UTIL FUNCTIONS", function () {
    describe("hyphenateKeys", function () {
        it("should convert from camelCase to hyphenated keys", function () {
            var input = {
                camel: "string",
                camelCase: "string"
            }, output = {
                camel: "string",
                "camel-case": "string"
            }, inputHyph = util_1.hyphenateKeys(input);
            inputHyph.should.deep.equal(output);
        });
    });
    describe("toArrIfExist", function () {
        it("should convert option to array if any has been given", function () {
            var test = util_1.toArrIfExist("option");
            test.should.be.a("array");
            test.should.eql(["option"]);
        });
        it("should return array if one is given", function () {
            var test = util_1.toArrIfExist(["option"]);
            test.should.be.a("array");
            test.should.eql(["option"]);
        });
        it("should return undefined if value doesn't exist", function () {
            var test = util_1.toArrIfExist(undefined);
            expect(test).to.be.undefined;
        });
    });
    describe("concatDefaults", function () {
        var defaultIgnores = ["module1", "module2"];
        var opts = {
            ignore: ["module3", "module4"]
        };
        it("concatDefaults should concatenate arrays if more than defaults available", function () {
            var test = util_1.concatDefaults(defaultIgnores, opts.ignore);
            test.should.eql(["module1", "module2", "module3", "module4"]);
        });
        it("concatDefaults should return defaults if no more options available", function () {
            var test = util_1.concatDefaults(defaultIgnores, undefined);
            test.should.eql(["module1", "module2"]);
        });
    });
});
