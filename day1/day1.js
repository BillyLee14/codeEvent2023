"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var NumberString = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
];
var readData = function () {
    var file = (0, fs_1.readFileSync)('./data.txt', 'utf-8');
    var splittedFile = file.split(/\r?\n/);
    console.log(sumAllCalculatedValue(splittedFile));
};
var getDigitsFromString = function (value) {
    var digits = [];
    for (var i = 0; i < value.length; i++) {
        var parseValue = parseInt(value[i]);
        if (!isNaN(parseValue)) {
            digits.push(parseValue);
        }
    }
    return digits;
};
var calculateValue = function (value) {
    var digits = getDigitsFromString(findDigitByNameAndReplace(value));
    var combineDigit = "".concat(digits[0]).concat(digits[digits.length - 1]);
    return parseInt(combineDigit);
};
var sumAllCalculatedValue = function (values) {
    var result = 0;
    values.forEach(function (value) {
        result = result + calculateValue(value);
    });
    return result;
};
var sort = function (valueWithIndex) {
    return valueWithIndex.sort(function (a, b) {
        return a.index - b.index;
    });
};
var findDigitByNameAndReplace = function (value) {
    var newValue = value;
    var valueWithIndex = [];
    NumberString.forEach(function (n, i) {
        var findIndex = value.indexOf(n);
        if (findIndex >= 0) {
            valueWithIndex.push({ index: findIndex, value: n, indexInList: i });
        }
    });
    var sortValues = sort(valueWithIndex);
    sortValues.forEach(function (v, i) {
        newValue = newValue.split(v.value).join(v.indexInList.toString() + v.value);
    });
    return newValue;
};
readData();
