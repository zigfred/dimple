// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/series/methods/_getWidth.js
(function () {
    "use strict";
    // Calculate the physical width for the passed unscaled value
    dimple.series.prototype._getWidth = function (unscaledX, unscaledWidth, innerBarCount) {
        var returnWidth = 0;
        // Validate the axis
        dimple.validation._isDefined("x axis", this.x);
        // If there is a time field the width is fixed
        if (this.x._hasTimeField()) {
            returnWidth = this.x.floatingBarWidth;
        } else {
            // Validate variables
            dimple.validation._isDefined("unscaledX", unscaledX);
            dimple.validation._isDefined("unscaledWidth", unscaledWidth);
            // Handle the return type based on axis type
            if (this.x._hasMeasure() && unscaledX < 0) {
                // For a negative measure value subtract width from X to get the extremity and subtract X.  It doesn't
                // work to just scale width because scale is not necessarily linear (e.g. Log axes)
                returnWidth = Math.abs(this.x._scaleValue(unscaledX - unscaledWidth) - this.x._scaleValue(unscaledX));
            } else if (this.x._hasMeasure()) {
                // Add x to width to get the extremity and subtract X.  It doesn't work to just scale width because
                // scale is not necessarily linear (e.g. Log axes)
                returnWidth = Math.abs(this.x._scaleValue(unscaledX + unscaledWidth) - this.x._scaleValue(unscaledX));
            } else if (this.x._hasMultipleCategories()) {
                // Validate the bar variables
                dimple.validation._isPositiveNumber("innerBarCount", innerBarCount);
                // Scale to get the left position of the bar and add half the bar size to get the centre
                returnWidth = (this._getBarSize("x") / innerBarCount) - (2 * this._getInnerBarGap("x", innerBarCount));
            } else if (this.x._hasCategories()) {
                // Scale to get the left position of the bar and add half the bar size to get the centre
                returnWidth = this._getBarSize("x");
            } else {
                throw dimple.exception.unsupportedAxisState("x");
            }
        }
        // Return the width
        return returnWidth;
    };
}());
