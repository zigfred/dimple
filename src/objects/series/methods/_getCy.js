        // Copyright: 2013 PMSI-AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/series/methods/_getCy.js

        /**
         * Calculate the physical centre y co-ordinate for the passed unscaled value
         * @param {string} unscaledValue - The logical cy value to be converted to a physical value.  It could be a string for category axes or a number for measure axes.
         * @param {number} [innerBarCount] - The number of small bars within a bar group.  This is only required for multiple category axes.
         * @param {number} [offset] - The zero based index of an inner bar within a bar group.  This is only required for multiple category axes.
         */
        this._getCy = function (unscaledValue, innerBarCount, offset) {
            var returnCy = 0;
            // Validate the required parameters and properties
            dimple.validation._isDefined("y axis", this.y);
            dimple.validation._isDefined("unscaledValue", unscaledValue);
            // Act based on axis types
            if (this.y._hasMeasure() || this.y._hasTimeField()) {
                // Measures can return a straight scale
                returnCy = this.y._scaleValue(unscaledValue);
            } else if (this.y._hasMultipleCategories()) {
                // For multiple categories the second two parameters are required
                dimple.validation._isPositiveNumber("innerBarCount", innerBarCount);
                dimple.validation._isPositiveNumber("offset", offset);
                // Scale to get the bottom position and then calculate the inner position of the bar based on offset
                // plus a half accounting for bar gaps
                returnCy = this.y._scaleValue(unscaledValue) - this.y._pointSize() + this._yBarGap() + (offset + 0.5) * (this._yBarSize() / innerBarCount);
            } else if (this.y._hasCategories()) {
                // Scale to get the left position of the bar and add half the bar size to get the centre
                returnCy = this.y._scaleValue(unscaledValue) - (this.y._pointSize() / 2);
            } else {
                throw dimple.exception.unsupportedAxisState("y");
            }
            return returnCy;
        };

