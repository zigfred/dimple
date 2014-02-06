// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/series/methods/_getBarSize.js
// Tests: /test/objects/series/methods/_getBarSize.spec.js
(function () {
    "use strict";
    /**
     * The number of pixels along the given axis allocated to a bar (excluding bar gap).
     * @param {string} position - one-letter name of the axis on which to calculate the gap ("x" or "y").
     * @return {number} - The physical gap in pixels on one side of the bar.
     */
    dimple.Series.prototype._getBarSize = function (position) {
        var returnSize = 0;
        // Validate the axis
        dimple.validation._isDefined("position", position);
        dimple.validation._isDefined(position + " axis", this[position]);
        // If the axis doesn't have a measure and there is a bar gap defined return the size
        if (!this[position]._hasMeasure()) {
            returnSize = (this[position]._pointSize()) - 2 * this._getBarGap(position);
        }
        return returnSize;
    };
}());
