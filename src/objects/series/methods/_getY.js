// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/series/methods/_getY.js
(function () {
    "use strict";
    // Calculate the top left y co-ordinate for the passed unscaled value
    // If provided, offset will calculate the center of the zero based nth inner bar
    dimple.series.prototype._getY = function (unscaledValue, innerBarCount, offset) {
        var returnY = 0;
        // Validate the axis
        dimple.validation._isDefined("y axis", this.y);
        dimple.validation._isDefined("unscaledValue", unscaledValue);
        // Handle the return type based on axis typex
        if (this.y._hasTimeField()) {
            // Centre on the y value rather than return top left
            returnY = this.y._scaleValue(unscaledValue) - (this.y.floatingBarWidth / 2);
        } else if (this.y._hasMeasure()) {
            // Simply return the scaled value
            returnY = this.y._scaleValue(unscaledValue);
        } else if (this.y._hasMultipleCategories()) {
            // For multiple categories the second two parameters are required
            dimple.validation._isPositiveNumber("innerBarCount", innerBarCount);
            dimple.validation._isPositiveNumber("offset", offset);
            // Scale to get the left position of the bar and add half the bar size to get the centre
            returnY = this.y._scaleValue(unscaledValue) - this._getBarSize("y") + this._getBarGap("y") + offset * (this._getBarSize("y") / innerBarCount);
        } else if (this.y._hasCategories()) {
            // Scale to get the left position of the bar and add half the bar size to get the centre
            returnY = this.y._scaleValue(unscaledValue) - this._getBarSize("y") + this._getBarGap("y");
        } else {
            throw dimple.exception.unsupportedAxisState("y");
        }
        return returnY;
    };
}());
