/*global expect, describe, it, beforeEach, spyOn */
(function () {
    "use strict";

    describe("dimple.series._getWidth", function() {

        var seriesUnderTest = null,
            // Mock return values as ascending primes to avoid coincidental passes
            negativeUnscaledX = -2,
            unscaledX = 2,
            scaleReturn = 3,
            innerBarCount = 7,
            innerBarGap = 11,
            barGap = 13,
            pointSize = 17,
            barSize = 19,
            floatingBarWidth = 23,
            unscaledWidth = 29;

        beforeEach(function () {
            // The axis to return mock values while testing
            var mockAxis = jasmine.createSpyObj("axis spy", [
                "_hasMeasure",
                "_hasCategories",
                "_hasMultipleCategories",
                "_hasTimeField",
                "_scaleValue",
                "_pointSize"
            ]);
            // These will be individually overridden in tests to mock different axis types
            mockAxis._hasMeasure.andReturn(false);
            mockAxis._hasCategories.andReturn(false);
            mockAxis._hasMultipleCategories.andReturn(false);
            mockAxis._hasTimeField.andReturn(false);
            // Set the return type dimensions
            mockAxis._scaleValue.andReturn(scaleReturn);
            mockAxis._pointSize.andReturn(pointSize);

            // Instantiate the series to test
            seriesUnderTest = new dimple.series();
            seriesUnderTest.x = mockAxis;
            seriesUnderTest.x.floatingBarWidth = floatingBarWidth;

            // Set up series mocks
            spyOn(seriesUnderTest, "_getBarGap").andReturn(barGap);
            spyOn(seriesUnderTest, "_getBarSize").andReturn(barSize);
            spyOn(seriesUnderTest, "_getInnerBarGap").andReturn(innerBarGap);

            // Set up validation spies
            spyOn(dimple.validation, "_isDefined").andReturn(true);
            spyOn(dimple.validation, "_isNumber").andReturn(true);
            spyOn(dimple.validation, "_isPositiveNumber").andReturn(true);

        });

        it("Validates required members", function () {
            try {
                seriesUnderTest._getWidth(unscaledX, unscaledWidth, innerBarCount);
            } catch (ignore) {
                /* validation is not under test */
            }
            expect(dimple.validation._isDefined).toHaveBeenCalledWith("x axis", seriesUnderTest.x);
        });

        it("Doesn't validate x and width for time series", function () {
            seriesUnderTest.x._hasTimeField.andReturn(true);
            try {
                seriesUnderTest._getWidth(unscaledX, unscaledWidth, innerBarCount);
            } catch (ignore) { /* validation is not under test */ }
            expect(dimple.validation._isDefined).not.toHaveBeenCalledWith("unscaledX", unscaledX);
            expect(dimple.validation._isDefined).not.toHaveBeenCalledWith("unscaledWidth", unscaledWidth);
        });

        it("Validates x and width for axes other than time series", function () {
            try {
                seriesUnderTest._getWidth(unscaledX, unscaledWidth, innerBarCount);
            } catch (ignore) { /* validation is not under test */ }
            expect(dimple.validation._isDefined).toHaveBeenCalledWith("unscaledX", unscaledX);
            expect(dimple.validation._isDefined).toHaveBeenCalledWith("unscaledWidth", unscaledWidth);
        });

        it("Does not validate inner bar count for axes other than multiple category", function() {
            try {
                seriesUnderTest._getWidth(unscaledX, unscaledWidth, innerBarCount);
            } catch (ignore) {
                /* validation is not under test */
            }
            expect(dimple.validation._isPositiveNumber).not.toHaveBeenCalled();
        });

        it("Validates inner bar count for multiple category axes", function() {
            seriesUnderTest.x._hasMultipleCategories.andReturn(true);
            try {
                seriesUnderTest._getWidth(unscaledX, unscaledWidth, innerBarCount);
            } catch (ignore) {
                /* validation is not under test */
            }
            expect(dimple.validation._isPositiveNumber).toHaveBeenCalledWith("innerBarCount", innerBarCount);
        });

        it("Throws an exception if axis returns false for all types", function() {
            expect(function () { seriesUnderTest._getWidth(unscaledX, unscaledWidth, innerBarCount); })
                .toThrow(dimple.exception.unsupportedAxisState("x"));
            expect(seriesUnderTest.x._hasMeasure).toHaveBeenCalled();
            expect(seriesUnderTest.x._hasCategories).toHaveBeenCalled();
            expect(seriesUnderTest.x._hasMultipleCategories).toHaveBeenCalled();
            expect(seriesUnderTest.x._hasTimeField).toHaveBeenCalled();
        });

        it("Returns correct value for negative values on measure axes", function() {
            seriesUnderTest.x._hasMeasure.andReturn(true);
            expect(seriesUnderTest._getWidth(negativeUnscaledX, unscaledWidth, innerBarCount)).toEqual(scaleReturn - scaleReturn);
            expect(seriesUnderTest.x._hasMeasure).toHaveBeenCalled();
            expect(seriesUnderTest.x._scaleValue).toHaveBeenCalledWith(negativeUnscaledX - unscaledWidth);
            expect(seriesUnderTest.x._scaleValue).toHaveBeenCalledWith(negativeUnscaledX);
        });

        it("Returns correct value for positive values on measure axes", function() {
            seriesUnderTest.x._hasMeasure.andReturn(true);
            expect(seriesUnderTest._getWidth(unscaledX, unscaledWidth, innerBarCount)).toEqual(scaleReturn - scaleReturn);
            expect(seriesUnderTest.x._hasMeasure).toHaveBeenCalled();
            expect(seriesUnderTest.x._scaleValue).toHaveBeenCalledWith(unscaledX + unscaledWidth);
            expect(seriesUnderTest.x._scaleValue).toHaveBeenCalledWith(unscaledX);
        });

        it("Returns floating bar width for time axes", function() {
            seriesUnderTest.x._hasTimeField.andReturn(true);
            expect(seriesUnderTest._getWidth(unscaledX, unscaledWidth, innerBarCount)).toEqual(floatingBarWidth);
            expect(seriesUnderTest.x._hasTimeField).toHaveBeenCalled();
        });

        it("Returns inner bar width for multiple categories", function() {
            seriesUnderTest.x._hasMultipleCategories.andReturn(true);
            expect(seriesUnderTest._getWidth(unscaledX, unscaledWidth, innerBarCount)).toEqual(barSize / innerBarCount - 2 * innerBarGap);
            expect(seriesUnderTest.x._hasMultipleCategories).toHaveBeenCalled();
            expect(seriesUnderTest._getBarSize).toHaveBeenCalledWith("x");
            expect(seriesUnderTest._getInnerBarGap).toHaveBeenCalledWith("x", innerBarCount);
        });

        it("Returns bar size for single categories", function() {
            seriesUnderTest.x._hasCategories.andReturn(true);
            expect(seriesUnderTest._getWidth(unscaledX, unscaledWidth, innerBarCount)).toEqual(barSize);
            expect(seriesUnderTest._getBarSize).toHaveBeenCalledWith("x");
        });

    });

}());