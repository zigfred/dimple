/*global expect, describe, it, beforeEach, spyOn */
(function () {
    "use strict";

    describe("dimple.series._getRadius", function() {

        var seriesUnderTest = null,
            // Mock return values as ascending primes to avoid coincidental passes
            unscaledValue = 2,
            scaleReturn = 3,
            defaultValue = 5;

        beforeEach(function () {
            // The axis to return mock values while testing
            var mockAxis = jasmine.createSpyObj("axis spy", [
                "_hasMeasure",
                "_scaleValue"
            ]);
            // These will be individually overridden in tests to mock different axis types
            mockAxis._hasMeasure.andReturn(false);
            // Set the return type dimensions
            mockAxis._scaleValue.andReturn(scaleReturn);

            // Instantiate the series to test
            seriesUnderTest = new dimple.Series();
            seriesUnderTest.z = mockAxis;

            // Set up validation spies
            spyOn(dimple.validation, "_isDefined").andReturn(true);

        });

        it("Validates required parameters", function () {
            try {
                seriesUnderTest._getRadius(unscaledValue);
            } catch (ignore) { /* validation is not under test */ }
            expect(dimple.validation._isDefined).toHaveBeenCalledWith("unscaledValue", unscaledValue);
        });

        it("Returns default value if there is no z axis", function() {
            seriesUnderTest.z = undefined;
            expect(seriesUnderTest._getRadius(unscaledValue)).toEqual(defaultValue);
        });

        it("Returns default value if there is no measure on z", function() {
            // Mock object returns false by default
            expect(seriesUnderTest._getRadius(unscaledValue)).toEqual(defaultValue);
            expect(seriesUnderTest.z._hasMeasure).toHaveBeenCalled();
        });

        it("Returns scaled value if there is a measure on z", function() {
            // Mock object returns false by default
            seriesUnderTest.z._hasMeasure.andReturn(true);
            expect(seriesUnderTest._getRadius(unscaledValue)).toEqual(scaleReturn);
            expect(seriesUnderTest.z._hasMeasure).toHaveBeenCalled();
            expect(seriesUnderTest.z._scaleValue).toHaveBeenCalledWith(unscaledValue);
        });

    });

}());