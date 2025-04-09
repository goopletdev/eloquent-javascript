import {
    flatten,
    loop,
    everyLoop,
    everySome,
} from '../exercises/chapter-05';

describe ('flatten', () => {
    it ('flattens arrays one level', () => {
        expect(flatten([
            [1,2,3,],
            [4,5],
            [6],
        ])).toEqual([1,2,3,4,5,6,]);
    });
});

describe ('loop', () => {
    it ('behaves like a for loop', () => {
        const logSpy = jest.spyOn(console,'log');
        loop(3, (n: number)=> n > 0, (n: number) => n - 1, console.log);
        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenLastCalledWith(1);
    });
});

describe ('everything', () => {
    test ('everyLoop', () => {
        expect(everyLoop([1,3,5], (n: number) => n < 10)).toEqual(true);
        expect(everyLoop([2,4,16],(n: number) => n < 10)).toEqual(false);
        expect(everyLoop([],(n: number)=>n<10)).toBe(true);
    });
    test ('everySome', () => {
        expect(everySome([1,3,5], (n: number)=> n < 10)).toEqual(true);
        expect(everySome([2,4,16],(n: number) => n < 10)).toEqual(false);
        expect(everySome([],(n: number)=>n<10)).toBe(true);
    });
});