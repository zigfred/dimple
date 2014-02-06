// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/axis/methods/_hasTimeField.js
(function () {
    "use strict";
    dimple.axis.prototype._hasTimeField = function () {
        return (this.timeField !== null && this.timeField !== undefined);
    };
}());
