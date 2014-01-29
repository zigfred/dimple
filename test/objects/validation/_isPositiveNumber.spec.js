/*global expect, describe, it, beforeEach, spyOn */
(function () {
    "use strict";

    describe("dimple.validation._isPositiveNumber", function() {

        // A test exception to be returned by the exception mock
        var inputName = "Test Name",
            validationException = "Testing validation exception",
            stringValue = "A Valid Defined String",
            dateValue = new Date(),
            negativeNumberValue = -7.13,
            positiveNumberValue = 11.17,
            infiniteNumberValue = Number.POSITIVE_INFINITY,
            numericString = "123.456",
            zeroValue = 0,
            booleanValue = true,
            object = {},
            array = [1, 2, 3];

        beforeEach(function () {
            // Set up exception spies
            spyOn(dimple.exception, "invalidParameter").andReturn(validationException);
        });

        it("Raises an exception for a null value", function () {
            expect(function () { dimple.validation._isPositiveNumber(inputName, null); })
                .toThrow(validationException);
            expect(dimple.exception.invalidParameter).toHaveBeenCalledWith(inputName, "null", jasmine.any(String));
        });

        it("Raises an exception for an undefined value", function () {
            expect(function () { dimple.validation._isPositiveNumber(inputName, undefined); })
                .toThrow(validationException);
            expect(dimple.exception.invalidParameter).toHaveBeenCalledWith(inputName, "undefined", jasmine.any(String));
        });

        it("Raises an exception for a string", function () {
            expect(function () { dimple.validation._isPositiveNumber(inputName, stringValue); })
                .toThrow(validationException);
            expect(dimple.exception.invalidParameter).toHaveBeenCalledWith(inputName, stringValue, jasmine.any(String));
        });

        it("Raises an exception for a date", function () {
            expect(function () { dimple.validation._isPositiveNumber(inputName, dateValue); })
                .toThrow(validationException);
            expect(dimple.exception.invalidParameter).toHaveBeenCalledWith(inputName, "date", jasmine.any(String));
        });

        it("Doesn't raise an exception for a positive number", function () {
            expect(dimple.validation._isPositiveNumber(inputName, positiveNumberValue)).toEqual(true);
            expect(dimple.exception.invalidParameter).not.toHaveBeenCalled();
        });

        it("Raises an exception for a negative number", function () {
            expect(function () { dimple.validation._isPositiveNumber(inputName, negativeNumberValue); })
                .toThrow(validationException);
            expect(dimple.exception.invalidParameter).toHaveBeenCalledWith(inputName, negativeNumberValue, jasmine.any(String));
        });

        it("Doesn't raise an exception for zero", function () {
            expect(dimple.validation._isPositiveNumber(inputName, zeroValue)).toEqual(true);
            expect(dimple.exception.invalidParameter).not.toHaveBeenCalled();
        });

        it("Doesn't raise an exception for a numeric string", function () {
            expect(dimple.validation._isPositiveNumber(inputName, numericString)).toEqual(true);
            expect(dimple.exception.invalidParameter).not.toHaveBeenCalled();
        });

        it("Raises an exception for infinity", function () {
            expect(function () { dimple.validation._isPositiveNumber(inputName, infiniteNumberValue); })
                .toThrow(validationException);
            expect(dimple.exception.invalidParameter).toHaveBeenCalledWith(inputName, "infinity", jasmine.any(String));
        });

        it("Raises an exception for a boolean", function () {
            expect(function () { dimple.validation._isPositiveNumber(inputName, booleanValue); })
                .toThrow(validationException);
            expect(dimple.exception.invalidParameter).toHaveBeenCalledWith(inputName, "boolean", jasmine.any(String));
        });

        it("Raises an exception for an object", function () {
            expect(function () { dimple.validation._isPositiveNumber(inputName, object); })
                .toThrow(validationException);
            expect(dimple.exception.invalidParameter).toHaveBeenCalledWith(inputName, object, jasmine.any(String));
        });

        it("Raises an exception for an array", function () {
            expect(function () { dimple.validation._isPositiveNumber(inputName, array); })
                .toThrow(validationException);
            expect(dimple.exception.invalidParameter).toHaveBeenCalledWith(inputName, array, jasmine.any(String));
        });

    });

}());