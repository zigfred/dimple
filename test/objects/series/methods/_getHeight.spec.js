/*global expect, describe, it, beforeEach, spyOn */
(function () {
    "use strict";

    describe("dimple.series._getHeight", function() {

        var seriesUnderTest = null,
            // Mock return values as ascending primes to avoid coincidental passes
            negativeUnscaledY = -2,
            unscaledY = 2,
            scaleReturn = 3,
            innerBarCount = 7,
            innerBarGap = 11,
            barGap = 13,
            pointSize = 17,
            barSize = 19,
            floatingBarWidth = 23,
            unscaledHeight = 29;

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
            seriesUnderTest.y = mockAxis;
            seriesUnderTest.y.floatingBarWidth = floatingBarWidth;

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
                seriesUnderTest._getHeight(unscaledY, unscaledHeight, innerBarCount);
            } catch (ignore) {
                /* validation is not under test */
            }
            expect(dimple.validation._isDefined).toHaveBeenCalledWith("y axis", seriesUnderTest.y);
        });

        it("Doesn't validate y and height for time series", function () {
            seriesUnderTest.y._hasTimeField.andReturn(true);
            try {
                seriesUnderTest._getHeight(unscaledY, unscaledHeight, innerBarCount);
            } catch (ignore) { /* validation is not under test */ }
            expect(dimple.validation._isDefined).not.toHaveBeenCalledWith("unscaledY", unscaledY);
            expect(dimple.validation._isDefined).not.toHaveBeenCalledWith("unscaledHeight", unscaledHeight);
        });

        it("Validates y and height for axes other than time series", function () {
            try {
                seriesUnderTest._getHeight(unscaledY, unscaledHeight, innerBarCount);
            } catch (ignore) { /* validation is not under test */ }
            expect(dimple.validation._isDefined).toHaveBeenCalledWith("unscaledY", unscaledY);
            expect(dimple.validation._isDefined).toHaveBeenCalledWith("unscaledHeight", unscaledHeight);
        });

        it("Does not validate inner bar count for axes other than multiple category", function() {
            try {
                seriesUnderTest._getHeight(unscaledY, unscaledHeight, innerBarCount);
            } catch (ignore) {
                /* validation is not under test */
            }
            expect(dimple.validation._isPositiveNumber).not.toHaveBeenCalled();
        });

        it("Validates inner bar count for multiple category axes", function() {
            seriesUnderTest.y._hasMultipleCategories.andReturn(true);
            try {
                seriesUnderTest._getHeight(unscaledY, unscaledHeight, innerBarCount);
            } catch (ignore) {
                /* validation is not under test */
            }
            expect(dimple.validation._isPositiveNumber).toHaveBeenCalledWith("innerBarCount", innerBarCount);
        });

        it("Throws an exception if axis returns false for all types", function() {
            expect(function () { seriesUnderTest._getHeight(unscaledY, unscaledHeight, innerBarCount); })
                .toThrow(dimple.exception.unsupportedAxisState("y"));
            expect(seriesUnderTest.y._hasMeasure).toHaveBeenCalled();
            expect(seriesUnderTest.y._hasCategories).toHaveBeenCalled();
            expect(seriesUnderTest.y._hasMultipleCategories).toHaveBeenCalled();
            expect(seriesUnderTest.y._hasTimeField).toHaveBeenCalled();
        });

        it("Returns correct value for negative values on measure axes", function() {
            seriesUnderTest.y._hasMeasure.andReturn(true);
            expect(seriesUnderTest._getHeight(negativeUnscaledY, unscaledHeight, innerBarCount)).toEqual(scaleReturn - scaleReturn);
            expect(seriesUnderTest.y._hasMeasure).toHaveBeenCalled();
            expect(seriesUnderTest.y._scaleValue).toHaveBeenCalledWith(negativeUnscaledY);
            expect(seriesUnderTest.y._scaleValue).toHaveBeenCalledWith(negativeUnscaledY + unscaledHeight);
        });

        it("Returns correct value for positive values on measure axes", function() {
            seriesUnderTest.y._hasMeasure.andReturn(true);
            expect(seriesUnderTest._getHeight(unscaledY, unscaledHeight, innerBarCount)).toEqual(scaleReturn - scaleReturn);
            expect(seriesUnderTest.y._hasMeasure).toHaveBeenCalled();
            expect(seriesUnderTest.y._scaleValue).toHaveBeenCalledWith(unscaledY);
            expect(seriesUnderTest.y._scaleValue).toHaveBeenCalledWith(unscaledY - unscaledHeight);
        });

        it("Returns floating bar height for time axes", function() {
            seriesUnderTest.y._hasTimeField.andReturn(true);
            expect(seriesUnderTest._getHeight(unscaledY, unscaledHeight, innerBarCount)).toEqual(floatingBarWidth);
            expect(seriesUnderTest.y._hasTimeField).toHaveBeenCalled();
        });

        it("Returns inner bar height for multiple categories", function() {
            seriesUnderTest.y._hasMultipleCategories.andReturn(true);
            expect(seriesUnderTest._getHeight(unscaledY, unscaledHeight, innerBarCount)).toEqual(barSize / innerBarCount - 2 * innerBarGap);
            expect(seriesUnderTest.y._hasMultipleCategories).toHaveBeenCalled();
            expect(seriesUnderTest._getBarSize).toHaveBeenCalledWith("y");
            expect(seriesUnderTest._getInnerBarGap).toHaveBeenCalledWith("y", innerBarCount);
        });

        it("Returns bar size for single categories", function() {
            seriesUnderTest.y._hasCategories.andReturn(true);
            expect(seriesUnderTest._getHeight(unscaledY, unscaledHeight, innerBarCount)).toEqual(barSize);
            expect(seriesUnderTest._getBarSize).toHaveBeenCalledWith("y");
        });

    });

}());