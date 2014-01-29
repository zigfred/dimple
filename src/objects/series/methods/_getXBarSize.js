        // Copyright: 2013 PMSI-AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/series/methods/_getXBarSize.js
        // The amount of axis allocated to a single horizontal bar (accounting for bar gap)
        this._xBarSize = function () {
            var returnSize = 0;
            // Validate the axis
            dimple.validation._isDefined("x axis", this.x);
            // If the axis doesn't have a measure and there is a bar gap defined return the size
            if (!this.x._hasMeasure()) {
                returnSize = (this.x._pointSize()) - 2 * this._xBarGap();
            }
            return returnSize;
        };

