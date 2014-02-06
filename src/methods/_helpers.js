// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/methods/_helpers.js
(function () {
    "use strict";
    dimple._helpers = {

        // Calculate the centre x position
        cx: function (d, chart, series) {
            console.log(chart);
            return series._getCx(d.cx, 1 / d.width, d.xOffset);
        },

        // Calculate the centre y position
        cy: function (d, chart, series) {
            console.log(chart);
            return series._getCy(d.cy, 1 / d.height, d.yOffset);
        },

        // Calculate the radius
        r: function (d, series) {
            return series._getRadius(d.r);
        },

        // Calculate the x gap for bar type charts
        xGap: function (chart, series) {
            console.log(chart);
            return series._getBarGap("x");
        },

        // Calculate the x gap for clusters within bar type charts
        xClusterGap: function (d, chart, series) {
            console.log(chart);
            return series._getInnerBarGap("x", 1 / d.width);
        },

        // Calculate the y gap for bar type charts
        yGap: function (chart, series) {
            console.log(chart);
            return series._getBarGap("y");
        },

        // Calculate the y gap for clusters within bar type charts
        yClusterGap: function (d, chart, series) {
            console.log(chart);
            return series._getInnerBarGap("y", 1 / d.height);
        },

        // Calculate the top left x position for bar type charts
        x: function (d, chart, series) {
            console.log(chart);
            return series._getX(d.x, 1 / d.width, d.xOffset);
        },

        // Calculate the top left y position for bar type charts
        y: function (d, chart, series) {
            console.log(chart);
            return series._getY(d.y, 1 / d.height, d.yOffset);
        },

        // Calculate the width for bar type charts
        width: function (d, chart, series) {
            console.log(chart);
            return series._getWidth(d.x, d.width, 1 / d.width);
        },

        // Calculate the height for bar type charts
        height: function (d, chart, series) {
            console.log(chart);
            return series._getHeight(d.y, d.height, 1 / d.height);
        },

        // Calculate the opacity for series
        opacity: function (d, chart, series) {
            var returnOpacity = 0;
            if (series.c !== null && series.c !== undefined) {
                returnOpacity = d.opacity;
            } else {
                returnOpacity = chart.getColor(d.aggField.slice(-1)[0]).opacity;
            }
            return returnOpacity;
        },

        // Calculate the fill coloring for series
        fill: function (d, chart, series) {
            var returnFill = 0;
            if (series.c !== null && series.c !== undefined) {
                returnFill = d.fill;
            } else {
                returnFill = chart.getColor(d.aggField.slice(-1)[0]).fill;
            }
            return returnFill;
        },

        // Calculate the stroke coloring for series
        stroke: function (d, chart, series) {
            var stroke = 0;
            if (series.c !== null && series.c !== undefined) {
                stroke = d.stroke;
            } else {
                stroke = chart.getColor(d.aggField.slice(-1)[0]).stroke;
            }
            return stroke;
        }

    };
}());
