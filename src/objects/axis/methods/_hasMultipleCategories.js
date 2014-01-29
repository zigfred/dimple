        // Copyright: 2013 PMSI-AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/axis/methods/_hasMultipleCategories.js
        this._hasMultipleCategories = function () {
            return (this._hasCategories() && this.categoryFields.length > 1);
        };

