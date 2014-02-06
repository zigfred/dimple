// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/chart/methods/_yPixels.js
(function () {
    "use strict";
    // Access the pixel position of the y co-ordinate of the plot area
    dimple.chart.prototype._yPixels = function () {
        return dimple._parseYPosition(this.y, this.svg.node());
    };
}());
