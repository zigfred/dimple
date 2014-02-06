// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/legend/methods/_widthPixels.js
(function () {
    "use strict";
    // Access the pixel value of the width of the legend area
    dimple.Legend.prototype._widthPixels = function () {
        return dimple._parseXPosition(this.width, this.chart.svg.node());
    };
}());
