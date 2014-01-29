        // Copyright: 2013 PMSI-AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/series/methods/_getYBarGap.js
        // The gap on one side of a vertical bar
        this._yBarGap = function () {
            var returnGap = 0;
            // Validate the axis
            dimple.validation._isDefined("y axis", this.y);
            // If the axis doesn't have a measure and there is a bar gap defined return the gap
            if (!this.y._hasMeasure() && this.barGap > 0) {
                returnGap = (this.y._pointSize() * (this.barGap > 0.99 ? 0.99 : this.barGap)) / 2;
            }
            return returnGap;
        };

