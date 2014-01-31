/*global expect, describe, it, beforeEach, spyOn */
(function () {
    "use strict";

    describe("dimple.series._getXInnerBarGap", function() {

        var seriesUnderTest = null,
            // Mock return values as ascending primes to avoid coincidental passes
            pointSize = 5,
            barSize = 7,
            innerBarCount = 11;

        beforeEach(function () {
            // The axis to return mock values while testing
            var mockAxis = jasmine.createSpyObj("axis spy", [
                "_hasMeasure",
                "_hasMultipleCategories",
                "_pointSize"
            ]);
            // These will be individually overridden in tests to mock different axis types
            mockAxis._hasMeasure.andReturn(false);
            mockAxis._hasMultipleCategories.andReturn(false);
            // Set the return type dimensions
            mockAxis._pointSize.andReturn(pointSize);

            // Instantiate the series to test
            seriesUnderTest = new dimple.series();
            seriesUnderTest.x = mockAxis;

            // Mock other series methods
            spyOn(seriesUnderTest, "_getBarSize").andReturn(barSize);

            // Set up validation spies
            spyOn(dimple.validation, "_isDefined").andReturn(true);
            spyOn(dimple.validation, "_isPositiveNumber").andReturn(true);

        });

        it("Validates required members", function () {
            try {
                seriesUnderTest._getInnerBarGap("x", innerBarCount);
            } catch (ignore) {
                /* validation is not under test */
            }
            expect(dimple.validation._isDefined).toHaveBeenCalledWith("x axis", seriesUnderTest.x);
        });

        it("Validates required parameters", function () {
            try {
                seriesUnderTest._getInnerBarGap("x", innerBarCount);
            } catch (ignore) { /* validation is not under test */ }
            expect(dimple.validation._isDefined).toHaveBeenCalledWith("position", "x");
            expect(dimple.validation._isPositiveNumber).toHaveBeenCalledWith("innerBarCount", innerBarCount);
        });

        it("Return zero for non multi category axes", function() {
            expect(seriesUnderTest._getInnerBarGap("x", innerBarCount)).toEqual(0);
            expect(seriesUnderTest.x._hasMultipleCategories).toHaveBeenCalled();
        });

        it("Return zero for measure axes", function() {
            seriesUnderTest.x._hasMultipleCategories.andReturn(true);
            seriesUnderTest.x._hasMeasure.andReturn(true);
            expect(seriesUnderTest._getInnerBarGap("x", innerBarCount)).toEqual(0);
            expect(seriesUnderTest.x._hasMeasure).toHaveBeenCalled();
        });

        it("Correctly deals with values less than 0", function() {
            seriesUnderTest.x._hasMultipleCategories.andReturn(true);
            seriesUnderTest.clusterBarGap = -0.5;
            expect(seriesUnderTest._getInnerBarGap("x", innerBarCount)).toEqual(0);
        });

        it("Correctly deals with values greater than or equal to 0 and less than 1", function() {
            seriesUnderTest.x._hasMultipleCategories.andReturn(true);
            seriesUnderTest.clusterBarGap = 0.5;
            expect(seriesUnderTest._getInnerBarGap("x", innerBarCount)).toEqual((barSize / innerBarCount) * 0.5 / 2);
            expect(seriesUnderTest._getBarSize).toHaveBeenCalledWith("x");
        });

        it("Correctly deals with values greater than 0.99", function() {
            seriesUnderTest.x._hasMultipleCategories.andReturn(true);
            seriesUnderTest.clusterBarGap = 5;
            expect(seriesUnderTest._getInnerBarGap("x", innerBarCount)).toEqual((barSize / innerBarCount) * 0.99 / 2);
            expect(seriesUnderTest._getBarSize).toHaveBeenCalledWith("x");
        });

    });

}());