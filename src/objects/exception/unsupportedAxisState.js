// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/exception/unsupportedAxisState.js
(function () {
    "use strict";
    dimple.exception.unsupportedAxisState = function (axisPosition) {
        return "The " + axisPosition + " axis is in an unsupported state. This means the combination of categories/measure/time period are unrecognised.";
    };
}());

