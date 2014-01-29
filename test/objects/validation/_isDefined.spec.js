/*global expect, describe, it, beforeEach, spyOn */
(function () {
    "use strict";

    describe("dimple.validation._isDefined", function() {

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
            expect(function () { dimple.validation._isDefined(inputName, null); })
                .toThrow(validationException);
            expect(dimple.exception.invalidParameter).toHaveBeenCalledWith(inputName, "null", jasmine.any(String));
        });

        it("Raises an exception for an undefined value", function () {
            expect(function () { dimple.validation._isDefined(inputName, undefined); })
                .toThrow(validationException);
            expect(dimple.exception.invalidParameter).toHaveBeenCalledWith(inputName, "undefined", jasmine.any(String));
        });

        it("Doesn't raise an exception for a string", function () {
            expect(dimple.validation._isDefined(inputName, stringValue)).toEqual(true);
            expect(dimple.exception.invalidParameter).not.toHaveBeenCalled();
        });

        it("Doesn't raise an exception for a date", function () {
            expect(dimple.validation._isDefined(inputName, dateValue)).toEqual(true);
            expect(dimple.exception.invalidParameter).not.toHaveBeenCalled();
        });

        it("Doesn't raise an exception for a positive number", function () {
            expect(dimple.validation._isDefined(inputName, positiveNumberValue)).toEqual(true);
            expect(dimple.exception.invalidParameter).not.toHaveBeenCalled();
        });

        it("Doesn't raise an exception for a negative number", function () {
            expect(dimple.validation._isDefined(inputName, negativeNumberValue)).toEqual(true);
            expect(dimple.exception.invalidParameter).not.toHaveBeenCalled();
        });

        it("Doesn't raise an exception for a numeric string", function () {
            expect(dimple.validation._isDefined(inputName, numericString)).toEqual(true);
            expect(dimple.exception.invalidParameter).not.toHaveBeenCalled();
        });

        it("Doesn't raise an exception for zero", function () {
            expect(dimple.validation._isDefined(inputName, zeroValue)).toEqual(true);
            expect(dimple.exception.invalidParameter).not.toHaveBeenCalled();
        });

        it("Doesn't raise an exception for infinity", function () {
            expect(dimple.validation._isDefined(inputName, infiniteNumberValue)).toEqual(true);
            expect(dimple.exception.invalidParameter).not.toHaveBeenCalled();
        });

        it("Doesn't raise an exception for a boolean", function () {
            expect(dimple.validation._isDefined(inputName, booleanValue)).toEqual(true);
            expect(dimple.exception.invalidParameter).not.toHaveBeenCalled();
        });

        it("Doesn't raise an exception for an object", function () {
            expect(dimple.validation._isDefined(inputName, object)).toEqual(true);
            expect(dimple.exception.invalidParameter).not.toHaveBeenCalled();
        });

        it("Doesn't raise an exception for an array", function () {
            expect(dimple.validation._isDefined(inputName, array)).toEqual(true);
            expect(dimple.exception.invalidParameter).not.toHaveBeenCalled();
        });

    });

}());