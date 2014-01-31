        // Copyright: 2014 PMSI-AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/series/methods/_getBarSize.js
        // The amount of axis allocated to a single bar (accounting for bar gap)
        this._getBarSize = function (position) {
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

