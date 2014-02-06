// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/validation/_isDefined.js
(function () {
    "use strict";
    dimple.validation._isDefined = function (name, value) {
        var expected = "a defined value";
        if (value === undefined) {
            throw dimple.exception.invalidParameter(name, "undefined", expected);
        } else if (value === null) {
            throw dimple.exception.invalidParameter(name, "null", expected);
        } else {
            return true;
        }
    };
}());

