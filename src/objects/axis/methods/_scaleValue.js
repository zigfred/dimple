// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/axis/methods/_scaleValue.js
(function () {
    "use strict";
    dimple.Axis.prototype._scaleValue = function (unscaledValue) {
        var returnValue = 0;
        if (this._scale !== null && this._scale !== undefined) {
            returnValue = this._scale(unscaledValue);
        } else {
            throw "The axis does not have a defined scale.  Please ensure _update() has been run on this axis.";
        }
        return returnValue;
    };
}());
