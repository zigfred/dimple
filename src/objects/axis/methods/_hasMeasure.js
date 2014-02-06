// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/axis/methods/_hasMeasure.js
(function () {
    "use strict";
    dimple.axis.prototype._hasMeasure = function () {
        return (this.measure !== null && this.measure !== undefined);
    };
}());
