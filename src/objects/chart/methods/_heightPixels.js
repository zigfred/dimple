// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/chart/methods/_heightPixels.js
(function () {
    "use strict";
    // Access the pixel value of the height of the plot area
    dimple.Chart.prototype._heightPixels = function () {
        return dimple._parseYPosition(this.height, this.svg.node());
    };
}());
