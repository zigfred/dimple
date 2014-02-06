// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/exception/invalidParameter.js
(function () {
    "use strict";
    dimple.exception.invalidParameter = function (name, valueString, expectedString) {
        return name + " is invalid: '" + valueString + "' was received, " + expectedString + " was expected.";
    };
}());

