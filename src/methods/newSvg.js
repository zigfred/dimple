// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/methods/newSvg.js
// Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple#wiki-newSvg
(function () {
    "use strict";
    dimple.newSvg = function (parentSelector, width, height) {
        var selectedShape = null;
        if (parentSelector === null || parentSelector === undefined) {
            parentSelector = "body";
        }
        selectedShape = d3.select(parentSelector);
        if (selectedShape.empty()) {
            throw dimple.exception.noMatches(parentSelector);
        }
        return selectedShape.append("svg").attr("width", width).attr("height", height);
    };
}());
