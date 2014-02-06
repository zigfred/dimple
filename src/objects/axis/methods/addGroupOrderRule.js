// Copyright: 2014 PMSI-AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/axis/methods/addGroupOrderRule.js
// Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.axis#wiki-addGroupOrderRule
(function () {
    "use strict";
    dimple.axis.prototype.addGroupOrderRule = function (ordering, desc) {
        this._groupOrderRules.push({ ordering : ordering, desc : desc });
    };
}());
