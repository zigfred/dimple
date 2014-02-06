/*global expect, describe, it, beforeEach, spyOn */
(function () {
    "use strict";

    describe("dimple.series._getBarGap", function () {

        var seriesUnderTest = null,
            // Mock return values as ascending primes to avoid coincidental passes
            pointSize = 5;

        beforeEach(function () {
            // The axis to return mock values while testing
            var mockAxis = jasmine.createSpyObj("axis spy", [
                "_hasMeasure",
                "_pointSize"
            ]);
            // These will be individually overridden in tests to mock different axis types
            mockAxis._hasMeasure.andReturn(false);
            // Set the return type dimensions
            mockAxis._pointSize.andReturn(pointSize);

            // Instantiate the series to test
            seriesUnderTest = new dimple.Series();
            seriesUnderTest.x = mockAxis;

            // Set up validation spies
            spyOn(dimple.validation, "_isDefined").andReturn(true);

        });

        it("Validates required members", function () {
            try {
                seriesUnderTest._getBarGap("x");
            } catch (ignore) {
                /* validation is not under test */
            }
            expect(dimple.validation._isDefined).toHaveBeenCalledWith("x axis", seriesUnderTest.x);
        });

        it("Validates required parameters", function () {
            try {
                seriesUnderTest._getBarGap("x");
            } catch (ignore) {
                /* validation is not under test */
            }
            expect(dimple.validation._isDefined).toHaveBeenCalledWith("position", "x");
        });

        it("Return zero for measure axes (important for Mekkos)", function () {
            seriesUnderTest.x._hasMeasure.andReturn(true);
            expect(seriesUnderTest._getBarGap("x")).toEqual(0);
            expect(seriesUnderTest.x._hasMeasure).toHaveBeenCalled();
        });

        it("Correctly deals with values less than 0", function () {
            seriesUnderTest.barGap = -0.5;
            expect(seriesUnderTest._getBarGap("x")).toEqual(0);
        });

        it("Correctly deals with values greater than or equal to 0 and less than 1", function () {
            seriesUnderTest.barGap = 0.5;
            expect(seriesUnderTest._getBarGap("x")).toEqual(pointSize * 0.5 / 2);
            expect(seriesUnderTest.x._pointSize).toHaveBeenCalled();
        });

        it("Correctly deals with values greater than 0.99", function () {
            seriesUnderTest.barGap = 5;
            expect(seriesUnderTest._getBarGap("x")).toEqual(pointSize * 0.99 / 2);
            expect(seriesUnderTest.x._pointSize).toHaveBeenCalled();
        });

    });

}());