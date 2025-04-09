import {
    range,
    sum,
    reverseArray,
    reverseArrayInPlace,
    arrayToList,
    listToArray,
    prepend,
    nth,
    deepEqual,
} from '../exercises/chapter-04';

describe ('range', () => {
    it ('defaults to a step of 1', () => {
        expect(range(2,3)).toEqual([2,3]);
        expect(range(3,10)).toEqual([
            3,4,5,6,7,8,9,10,
        ]);
    });
    it ('handles arbitrary steps', () => {
        expect(range(2,3,2)).toEqual([2]);
        expect(range(5,11,3)).toEqual([5,8,11]);
        expect(range(3,20,4)).toEqual([3,7,11,15,19]);
    });
});

describe ('sum', () => {
    it ('sums all numbers in an array', () => {
        expect(sum([3,4,5])).toEqual(12);
        expect(sum([2,5,8,11])).toEqual(26);
    });
});

describe ('reverseArray', () => {
    it ('returns a new array, reversed', () => {
        const arr = [2,5,8,11];
        expect(reverseArray(arr)).toEqual([11,8,5,2]);
        expect(arr).toEqual([2,5,8,11]);
    });
});

describe ('reverseArrayInPlace', () => {
    it ('reverses array in place', () => {
        const arr = [2,5,8,11];
        reverseArrayInPlace(arr);
        expect(arr).toEqual([11,8,5,2]);
    });
});

describe ('list functions', () => {
    test ('arrayToList', () => {
        const arr = [2,4,6,8];
        expect(arrayToList(arr)).toEqual({
            value: 2,
            rest: {
                value: 4,
                rest: {
                    value: 6,
                    rest: {
                        value: 8,
                        rest: null,
                    },
                },
            },
        });
    });
    test ('listToArray', () => {
        expect(listToArray({
            value: 2,
            rest: {
                value: 4,
                rest: {
                    value: 6,
                    rest: {
                        value: 8,
                        rest: null,
                    },
                },
            },
        })).toEqual([2,4,6,8]);
    });
    test ('prepend', () => {
        expect(prepend(6,{
            value: 2,
            rest: null,
        })).toEqual({
            value: 6,
            rest: {
                value: 2,
                rest: null,
            },
        });
    });
    test ('nth', () => {
        const list = arrayToList([2,4,5,7,10,17]);
        expect(nth(list,3)?.value).toEqual(7);
        expect(nth(list,4)).toEqual({
            value: 10,
            rest: {
                value: 17,
                rest: null,
            },
        });
        expect(nth(list,32)).toEqual(undefined);
    });
});

describe ('deepEqual', () => {
    it ('compares objects for deep equality', () => {
        let obj = {here: {is: "an"}, object: 2};
        expect(deepEqual(obj, obj)).toBe(true);
        expect(deepEqual(obj, {here: 1, object: 2})).toBe(false);
        expect(deepEqual(obj, {here: {is: "an"}, object: 2})).toBe(true);
    });
});