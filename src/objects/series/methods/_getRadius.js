// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/series/methods/_getRadius.js
(function () {
    "use strict";
    // Calculate the radius for the passed unscaled value
    dimple.series.prototype._getRadius = function (unscaledValue) {
        // Return a default value for series without z axes
        var returnRadius = 5;
        // Validate the parameter
        dimple.validation._isDefined("unscaledValue", unscaledValue);
        // Scale the bubbles on z if relevant
        if (this.z !== null && this.z !== undefined && this.z._hasMeasure()) {
            // Measures can return a scaled value
            returnRadius = this.z._scaleValue(unscaledValue);
        }
        return returnRadius;
    };
}());
