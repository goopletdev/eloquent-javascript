import {
    Vec,
    Group,
} from "../exercises/chapter-06";

describe ('Vec', () => {
    it ('calculates a new Vec from the sum of two Vecs', () => {
        const vec1 = new Vec(1, 2).plus(new Vec(2, 3));
        expect(vec1).toBeInstanceOf(Vec);
        expect([vec1.x,vec1.y]).toEqual([3,5]);    
    });
    it ('calculates a new vec from the diff of two vecs', () => {
        const vec2 = new Vec(1, 2).minus(new Vec(2, 3));
        expect(vec2).toBeInstanceOf(Vec);
        expect([vec2.x,vec2.y]).toEqual([-1,-1]);
    });
    it ('calculates vec length w/ pythagorean theorem', () => {
        expect(new Vec(3, 4).length).toEqual(5);
    });
});

describe ('Group', () => {
    test ('group methods', () => {
        const group = Group.from([10,20]);
        expect(group.has(10)).toBe(true);
        expect(group.has(30)).toBe(false);
        group.add(10);
        group.delete(10);
        expect(group.has(10)).toBe(false);
    });
    it ('is iterable', () => {
        jest.clearAllMocks();
        const logSpy = jest.spyOn(console, 'log');
        for (let value of Group.from(['a','b','c'])) {
            console.log(value);
        }
        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenCalledWith('a');
    });
});