// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/methods/getUniqueValues.js
// Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple#wiki-getUniqueValues
(function () {
    "use strict";
    dimple.getUniqueValues = function (data, fields) {
        var returnList = [];
        // Put single values into single value arrays
        if (fields !== null && fields !== undefined) {
            fields = [].concat(fields);
            // Iterate every row in the data
            data.forEach(function (d) {
                // Handle multiple category values by iterating the fields in the row and concatenate the values
                var field = "";
                fields.forEach(function (f, i) {
                    if (i > 0) {
                        field += "/";
                    }
                    field += d[f];
                }, this);
                // If the field was not found, add it to the end of the categories array
                if (returnList.indexOf(field) === -1) {
                    returnList.push(field);
                }
            }, this);
        }
        return returnList;
    };
}());
