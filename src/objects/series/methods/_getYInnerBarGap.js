        // Copyright: 2013 PMSI-AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/series/methods/_getYInnerBarGap.js
        // The gap on one side of a vertical bar inside a cluster
        this._yInnerBarGap = function (innerBarCount) {
            var returnGap = 0;
            // Validate the axis
            dimple.validation._isDefined("y axis", this.y);
            // Only return an inner bar gap if this is a multiple category type axis
            if (this.y._hasMultipleCategories() && !this.y._hasMeasure() && this.clusterBarGap > 0) {
                returnGap = ((this._yBarSize() / innerBarCount) * (this.clusterBarGap > 0.99 ? 0.99 : this.clusterBarGap)) / 2;
            }
            return returnGap;
        };