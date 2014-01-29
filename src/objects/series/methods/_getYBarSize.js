        // Copyright: 2013 PMSI-AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/series/methods/_getYBarSize.js
        // The amount of axis allocated to a single vertical bar (accounting for bar gap)
        this._yBarSize = function () {
            var returnSize = 0;
            // Validate the axis
            dimple.validation._isDefined("y axis", this.y);
            // Only return a size if there is no measure
            if (!this.y._hasMeasure()) {
                returnSize = (this.y._pointSize()) - 2 * this._yBarGap();
            }
            return returnSize;
        };

