/*global expect, describe, it, beforeEach, spyOn */
(function () {
    "use strict";

    describe("dimple.series._getBarSize", function() {

        var seriesUnderTest = null,
            // Mock return values as ascending primes to avoid coincidental passes
            pointSize = 5,
            barGap = 7;

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
            seriesUnderTest = new dimple.series();
            seriesUnderTest.x = mockAxis;

            // Mock other series methods
            spyOn(seriesUnderTest, "_getBarGap").andReturn(barGap);

            // Set up validation spies
            spyOn(dimple.validation, "_isDefined").andReturn(true);

        });

        it("Validates required members", function () {
            try {
                seriesUnderTest._getBarSize("x");
            } catch (ignore) {
                /* validation is not under test */
            }
            expect(dimple.validation._isDefined).toHaveBeenCalledWith("x axis", seriesUnderTest.x);
        });

        it("Validates required parameters", function () {
            try {
                seriesUnderTest._getBarSize("x");
            } catch (ignore) {
                /* validation is not under test */
            }
            expect(dimple.validation._isDefined).toHaveBeenCalledWith("position", "x");
        });

        it("Return zero for measure axes", function() {
            seriesUnderTest.x._hasMeasure.andReturn(true);
            expect(seriesUnderTest._getBarSize("x")).toEqual(0);
            expect(seriesUnderTest.x._hasMeasure).toHaveBeenCalled();
        });

        it("Correctly calculates size for category axes", function() {
            expect(seriesUnderTest._getBarSize("x")).toEqual(pointSize - 2 * barGap);
            expect(seriesUnderTest.x._pointSize).toHaveBeenCalled();
            expect(seriesUnderTest._getBarGap).toHaveBeenCalledWith("x");
        });

    });

}());