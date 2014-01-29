    // Copyright: 2013 PMSI-AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
    // Source: /src/methods/_helpers.js
    dimple._helpers = {

        // Calculate the centre x position
        cx: function (d, chart, series) {
            console.log(d);
            console.log(chart);
            console.log(series);
            return series._getCx(d.cx, 1 / d.width, d.xOffset);
        },

        // Calculate the centre y position
        cy: function (d, chart, series) {
            console.log(d);
            console.log(chart);
            console.log(series);
            return series._getCy(d.cy, 1 / d.height, d.yOffset);
        },

        // Calculate the radius
        r: function (d, series) {
            console.log(d);
            console.log(series);
            return series._getRadius(d.r);
        },

        // Calculate the x gap for bar type charts
        xGap: function (chart, series) {
            console.log(chart);
            console.log(series);
            return series._xBarGap();
        },

        // Calculate the x gap for clusters within bar type charts
        xClusterGap: function (d, chart, series) {
            console.log(d);
            console.log(chart);
            console.log(series);
            return series._xInnerBarGap(1 / d.width);
        },

        // Calculate the y gap for bar type charts
        yGap: function (chart, series) {
            console.log(chart);
            console.log(series);
            return series._yBarGap();
        },

        // Calculate the y gap for clusters within bar type charts
        yClusterGap: function (d, chart, series) {
            console.log(d);
            console.log(chart);
            console.log(series);
            return series._yInnerBarGap(1 / d.height);
        },

        // Calculate the top left x position for bar type charts
        x: function (d, chart, series) {
            console.log(d);
            console.log(chart);
            console.log(series);
            var returnX = 0;
            if (series.x._hasTimeField()) {
                returnX = series.x._scale(d.x) - (dimple._helpers.width(d, chart, series) / 2);
            } else if (series.x.measure !== null && series.x.measure !== undefined) {
                returnX = series.x._scale(d.x);
            } else {
                returnX = series.x._scale(d.x) + dimple._helpers.xGap(chart, series) + (d.xOffset * (dimple._helpers.width(d, chart, series) + 2 * dimple._helpers.xClusterGap(d, chart, series))) + dimple._helpers.xClusterGap(d, chart, series);
            }
            return returnX;
        },

        // Calculate the top left y position for bar type charts
        y: function (d, chart, series) {
            console.log(d);
            console.log(chart);
            console.log(series);
            var returnY = 0;
            if (series.y._hasTimeField()) {
                returnY = series.y._scale(d.y) - (dimple._helpers.height(d, chart, series) / 2);
            } else if (series.y.measure !== null && series.y.measure !== undefined) {
                returnY = series.y._scale(d.y);
            } else {
                returnY = (series.y._scale(d.y) - (chart._heightPixels() / series.y._max)) + dimple._helpers.yGap(chart, series) + (d.yOffset * (dimple._helpers.height(d, chart, series) + 2 * dimple._helpers.yClusterGap(d, chart, series))) + dimple._helpers.yClusterGap(d, chart, series);
            }
            return returnY;
        },

        // Calculate the width for bar type charts
        width: function (d, chart, series) {
            console.log(d);
            console.log(chart);
            console.log(series);
            var returnWidth = 0;
            if (series.x.measure !== null && series.x.measure !== undefined) {
                returnWidth = Math.abs(series.x._scale((d.x < 0 ? d.x - d.width : d.x + d.width)) - series.x._scale(d.x));
            } else if (series.x._hasTimeField()) {
                returnWidth = series.x.floatingBarWidth;
            } else {
                returnWidth = d.width * ((chart._widthPixels() / series.x._max) - (dimple._helpers.xGap(chart, series) * 2)) - (dimple._helpers.xClusterGap(d, chart, series) * 2);
            }
            return returnWidth;
        },

        // Calculate the height for bar type charts
        height: function (d, chart, series) {
            console.log(d);
            console.log(chart);
            console.log(series);
            var returnHeight = 0;
            if (series.y._hasTimeField()) {
                returnHeight = series.y.floatingBarWidth;
            } else if (series.y.measure !== null && series.y.measure !== undefined) {
                returnHeight = Math.abs(series.y._scale(d.y) - series.y._scale((d.y <= 0 ? d.y + d.height : d.y - d.height)));
            } else {
                returnHeight = d.height * ((chart._heightPixels() / series.y._max) - (dimple._helpers.yGap(chart, series) * 2)) - (dimple._helpers.yClusterGap(d, chart, series) * 2);
            }
            return returnHeight;
        },

        // Calculate the opacity for series
        opacity: function (d, chart, series) {
            console.log(d);
            console.log(chart);
            console.log(series);
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
            console.log(d);
            console.log(chart);
            console.log(series);
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
            console.log(d);
            console.log(chart);
            console.log(series);
            var stroke = 0;
            if (series.c !== null && series.c !== undefined) {
                stroke = d.stroke;
            } else {
                stroke = chart.getColor(d.aggField.slice(-1)[0]).stroke;
            }
            return stroke;
        }

    };

