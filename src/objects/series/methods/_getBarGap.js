// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/series/methods/_getBarGap.js
(function () {
    "use strict";
    // The gap on one side of a bar
    dimple.series.prototype._getBarGap = function (position) {
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
