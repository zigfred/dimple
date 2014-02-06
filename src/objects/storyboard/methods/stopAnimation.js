// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/storyboard/methods/stopAnimation.js
(function () {
    "use strict";
    dimple.Storyboard.prototype.stopAnimation = function () {
        if (this._animationTimer !== null) {
            window.clearInterval(this._animationTimer);
            this._animationTimer = null;
            this._frame = 0;
        }
    };
}());
