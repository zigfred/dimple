// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/legend/methods/_heightPixels.js
(function () {
    "use strict";
    // Access the pixel value of the height of the legend area
    dimple.legend.prototype._heightPixels = function () {
        return dimple._parseYPosition(this.height, this.chart.svg.node());
    };
}());
