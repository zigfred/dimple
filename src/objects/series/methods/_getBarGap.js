// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/series/methods/_getBarGap.js
// Tests: /test/objects/series/methods/_getBarGap.spec.js
(function () {
    "use strict";
    /**
     * Calculate gap on one side of a bar in a bar chart.
     * @param {string} position - one-letter name of the axis on which to calculate the gap ("x" or "y").
     * @return {number} - The physical gap in pixels on one side of the bar.
     */
    dimple.Series.prototype._getBarGap = function (position) {
        var returnGap = 0;
        // Validate the axis
        dimple.validation._isDefined("position", position);
        dimple.validation._isDefined(position + " axis", this[position]);
        // If the axis doesn't have a measure and there is a bar gap defined return the gap
        if (!this[position]._hasMeasure() && this.barGap > 0) {
            returnGap = (this[position]._pointSize() * (this.barGap > 0.99 ? 0.99 : this.barGap)) / 2;
        }
        return returnGap;
    };
}());
