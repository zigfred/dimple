// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/chart/methods/_widthPixels.js
(function () {
    "use strict";
    // Access the pixel value of the width of the plot area
    dimple.Chart.prototype._widthPixels = function () {
        return dimple._parseXPosition(this.width, this.svg.node());
    };
}());
