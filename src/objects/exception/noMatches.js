// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/exception/noMatches.js
(function () {
    "use strict";
    dimple.exception.noMatches = function (selector) {
        return "The '" + selector + "' selector did not match any elements. Please prefix with '#' to select by id or '.' to select by class.";
    };
}());
