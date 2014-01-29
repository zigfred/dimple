    // Copyright: 2013 PMSI-AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
    // Source: /src/objects/exception/exception.js
    dimple.exception = {
        noMatches: function (selector) {
            return "The '" + selector + "' selector did not match any elements. Please prefix with '#' to select by id or '.' to select by class.";
        },
        invalidParameter: function (name, valueString, expectedString) {
            return name + " is invalid: '" + valueString + "' was received, " + expectedString + " was expected.";
        },
        unsupportedAxisState: function (axisPosition) {
            return "The " + axisPosition + " axis is in an unsupported state. This means the combination of categories/measure/time period are unrecognised.";
        }
    };
