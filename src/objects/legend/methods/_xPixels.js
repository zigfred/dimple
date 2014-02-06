// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/legend/methods/_xPixels.js
(function () {
    "use strict";
    // Access the pixel position of the x co-ordinate of the legend area
    dimple.Legend.prototype._xPixels = function () {
        return dimple._parseXPosition(this.x, this.chart.svg.node());
    };
}());
