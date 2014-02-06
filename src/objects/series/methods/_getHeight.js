// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/series/methods/_getHeight.js
(function () {
    "use strict";
    // Calculate the physical height for the passed unscaled value
    dimple.series.prototype._getHeight = function (unscaledY, unscaledHeight, innerBarCount) {
        var returnHeight = 0;
        // Validate the axis
        dimple.validation._isDefined("y axis", this.y);
        // If there is a time field the height is fixed
        if (this.y._hasTimeField()) {
            returnHeight = this.y.floatingBarWidth;
        } else {
            // Validate variables
            dimple.validation._isDefined("unscaledY", unscaledY);
            dimple.validation._isDefined("unscaledHeight", unscaledHeight);
            // Handle the return type based on axis type
            if (this.y._hasMeasure() && unscaledY < 0) {
                // For a negative measure value subtract height from Y to get the extremity and subtract Y.  It doesn't
                // work to just scale height because scale is not necessarily linear (e.g. Log axes)
                returnHeight = Math.abs(this.y._scaleValue(unscaledY) - this.y._scaleValue(unscaledY + unscaledHeight));
            } else if (this.y._hasMeasure()) {
                // Add y to height to get the extremity and subtract Y.  It doesn't work to just scale height because
                // scale is not necessarily linear (e.g. Log axes)
                returnHeight = Math.abs(this.y._scaleValue(unscaledY) - this.y._scaleValue(unscaledY - unscaledHeight));
            } else if (this.y._hasMultipleCategories()) {
                // Validate the bar variables
                dimple.validation._isPositiveNumber("innerBarCount", innerBarCount);
                // Scale to get the left position of the bar and add half the bar size to get the centre
                returnHeight = (this._getBarSize("y") / innerBarCount) - (2 * this._getInnerBarGap("y", innerBarCount));
            } else if (this.y._hasCategories()) {
                // Scale to get the left position of the bar and add half the bar size to get the centre
                returnHeight = this._getBarSize("y");
            } else {
                throw dimple.exception.unsupportedAxisState("y");
            }
        }
        // Return the height
        return returnHeight;
    };
}());
