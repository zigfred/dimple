        // Copyright: 2013 PMSI-AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/series/methods/_getXInnerBarGap.js
        // The gap on one side of a horizontal bar inside a cluster
        this._xInnerBarGap = function (innerBarCount) {
            var returnGap = 0;
            // Validate the axis
            dimple.validation._isDefined("x axis", this.x);
            // This is only relevant to multiple categories
            if (this.x._hasMultipleCategories() && !this.x._hasMeasure() && this.clusterBarGap > 0) {
                returnGap = ((this._xBarSize() / innerBarCount) * (this.clusterBarGap > 0.99 ? 0.99 : this.clusterBarGap)) / 2;
            }
            return returnGap;
        };