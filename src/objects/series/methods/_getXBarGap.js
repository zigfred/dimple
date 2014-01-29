        // Copyright: 2013 PMSI-AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/series/methods/_getXBarGap.js
        // The gap on one side of a horizontal bar
        this._xBarGap = function () {
            var returnGap = 0;
            // Validate the axis
            dimple.validation._isDefined("x axis", this.x);
            // If the axis doesn't have a measure and there is a bar gap defined return the gap
            if (!this.x._hasMeasure() && this.barGap > 0) {
                returnGap = (this.x._pointSize() * (this.barGap > 0.99 ? 0.99 : this.barGap)) / 2;
            }
            return returnGap;
        };

