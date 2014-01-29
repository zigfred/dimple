        // Copyright: 2013 PMSI-AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/axis/methods/_pointSize.js
        // The amount of an axis allocated to a single data point in bar type charts (not accounting for bar gap)
        this._pointSize = function () {
            var returnValue = 0;
            if (this._hasCategories()) {
                if (this.position === "x") {
                    returnValue = (this.chart._widthPixels() / this._max);
                } else if (this.position === "y") {
                    returnValue = (this.chart._heightPixels() / this._max);
                }
            }
            return returnValue;
        };

