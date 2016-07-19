process.env.NODE_ENV = "testing";

import chai = require("chai");
import {hyphenateKeys,
    toArrIfExist,
    concatDefaults} from "../build/util";

var should = chai.should, // tslint:disable-line:no-unused-variable
    expect = chai.expect;

describe("UTIL FUNCTIONS", () => {
    describe("hyphenateKeys", () => {
        it("should convert from camelCase to hyphenated keys", () => {
            var input = {
                camel: "string",
                camelCase: "string"
            },
                output = {
                    camel: "string",
                    "camel-case": "string"
                },
                inputHyph = hyphenateKeys(input);

            inputHyph.should.deep.equal(output);
        });
    });
    describe("toArrIfExist", () => {
        it("should convert option to array if any has been given", () => {
            var test = toArrIfExist("option");
            test.should.be.a("array");
            test.should.eql(["option"]);
        });
        it("should return array if one is given", () => {
            var test = toArrIfExist(["option"]);
            test.should.be.a("array");
            test.should.eql(["option"]);
        });
        it("should return undefined if value doesn't exist", () => {
            var test = toArrIfExist(undefined);
            expect(test).to.be.undefined;
        });
    });
    describe("concatDefaults", () => {
        var defaultIgnores = ["module1", "module2"];
        var opts = {
            ignore: ["module3", "module4"]
        }

        it("concatDefaults should concatenate arrays if more than defaults available", () => {
            var test = concatDefaults(
                defaultIgnores,
                opts.ignore);
            test.should.eql(["module1", "module2", "module3", "module4"]);
        });
        it("concatDefaults should return defaults if no more options available", () => {
            var test = concatDefaults(
                defaultIgnores,
                undefined);
            test.should.eql(["module1", "module2"]);
        });
    });
});
