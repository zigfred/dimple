// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/series/methods/_getInnerBarGap.js
// Tests: /test/objects/series/methods/_getInnerBarGap.spec.js
(function () {
    "use strict";
    /**
     * The gap on one side of a horizontal bar inside a cluster.
     * @param {string} position - one-letter name of the axis on which to calculate the gap ("x" or "y").
     * @param {string} innerBarCount - The number of bars in a group.
     * @return {number} - The physical gap in pixels on one side of an inner bar.
     */
    dimple.Series.prototype._getInnerBarGap = function (position, innerBarCount) {
        var returnGap = 0;
        // Validate the axis
        dimple.validation._isDefined("position", position);
        dimple.validation._isDefined(position + " axis", this[position]);
        dimple.validation._isPositiveNumber("innerBarCount", innerBarCount);
        // This is only relevant to multiple categories
        if (this[position]._hasMultipleCategories() && !this[position]._hasMeasure() && this.clusterBarGap > 0) {
            returnGap = ((this._getBarSize(position) / innerBarCount) * (this.clusterBarGap > 0.99 ? 0.99 : this.clusterBarGap)) / 2;
        }
        return returnGap;
    };
}());
