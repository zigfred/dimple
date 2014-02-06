// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/series/methods/_getRadius.js
// Tests: /test/objects/series/methods/_getRadius.spec.js
(function () {
    "use strict";
    /**
     * Calculate the radius for the passed unscaled value.
     * @param {string} unscaledValue - The radius in logical values which will be converted to physical values.
     * @return {number} - The distance from the centre to the outer edge of a circle representing the passed value.
     */
    dimple.Series.prototype._getRadius = function (unscaledValue) {
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
