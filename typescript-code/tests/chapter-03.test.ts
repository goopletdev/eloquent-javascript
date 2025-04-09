import {
    min,
    isEven,
    countChar,
    countBs
} from '../exercises/chapter-03';

describe ('min', () => {
    it ('returns the lowest of two arguments', () => {
        expect(min(5,11)).toBe(5);
    });
    it ('should handle an arbitrary number of args', () => {
        expect(min(4,11,0,-7,9)).toEqual(-7);
    });
});

describe ('isEven', () => {
    it ('accurately checks whether a number is even', () => {
        expect(isEven(56)).toBe(true);
        expect(isEven(5)).toEqual(false);
        expect(isEven(0)).toBe(true);
        expect(isEven(-1)).toBe(false);
        expect(isEven(-2)).toBe(true);
    });
});

describe ('countChar', () => {{
    it ('counts the number of instances of the letter "c"', () => {
        expect(countChar('quick brown fox chomped on the lazy can','c'))
        .toEqual(3);
    });
}});

describe ('countBs', () => {
    it ('is a narrower version of countChar', () => {
        expect(countBs('bright Burgandy Bezos belighted bells')).toEqual(2);
    });
});