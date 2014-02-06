// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/validation/_isNumber.js
(function () {
    "use strict";
    dimple.validation._isNumber = function (name, value) {
        var expected = "a finite numeric value";
        if (value === undefined) {
            throw dimple.exception.invalidParameter(name, "undefined", expected);
        } else if (value === null) {
            throw dimple.exception.invalidParameter(name, "null", expected);
        } else if (isNaN(value)) {
            throw dimple.exception.invalidParameter(name, value, expected);
        } else if (!isFinite(value)) {
            throw dimple.exception.invalidParameter(name, "infinity", expected);
        } else if (typeof value === "boolean") {
            throw dimple.exception.invalidParameter(name, "boolean", expected);
        } else if ({}.toString.call(value) === "[object Date]") {
            throw dimple.exception.invalidParameter(name, "date", expected);
        } else {
            return true;
        }
    };
}());

