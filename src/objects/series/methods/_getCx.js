        // Copyright: 2014 PMSI-AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/series/methods/_getCx.js

        /**
         * Calculate the physical centre x co-ordinate for the passed unscaled value
         * @param {string} unscaledValue - The logical cx value to be converted to a physical value.  It could be a string for category axes or a number for measure axes.
         * @param {number} [innerBarCount] - The number of small bars within a bar group.  This is only required for multiple category axes.
         * @param {number} [offset] - The zero based index of an inner bar within a bar group.  This is only required for multiple category axes.
         */
        this._getCx = function (unscaledValue, innerBarCount, offset) {
            var returnCx = 0;
            // Validate the required parameters and properties
            dimple.validation._isDefined("x axis", this.x);
            dimple.validation._isDefined("unscaledValue", unscaledValue);
            // Act based on axis types
            if (this.x._hasMeasure() || this.x._hasTimeField()) {
                // Measures can return a straight scale
                returnCx = this.x._scaleValue(unscaledValue);
            } else if (this.x._hasMultipleCategories()) {
                // For multiple categories the second two parameters are required
                dimple.validation._isPositiveNumber("innerBarCount", innerBarCount);
                dimple.validation._isPositiveNumber("offset", offset);
                // Scale to get the left position and then calculate the inner position of the bar based on offset
                // plus a half accounting for bar gaps
                returnCx = this.x._scaleValue(unscaledValue) + this._getBarGap("x") + (offset + 0.5) * (this._getBarSize("x") / innerBarCount);
            } else if (this.x._hasCategories()) {
                // Scale to get the left position of the bar and add half the bar size to get the centre
                returnCx = this.x._scaleValue(unscaledValue) + (this.x._pointSize() / 2);
            } else {
                throw dimple.exception.unsupportedAxisState("x");
            }
            return returnCx;
        };

