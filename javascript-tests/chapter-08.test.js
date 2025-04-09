import {
    primitiveMultiply,
    retryLoop,
    retryRecursive,
    withBoxUnlocked,
    box,
} from '../javascript-exercises/chapter-08';

describe ('retry', () => {
    test ('retryLoop', () => {
        expect(retryLoop(primitiveMultiply,2,2)).toEqual(4);
        expect(retryRecursive(primitiveMultiply,4,5)).toEqual(20);
    });
});

describe ('lockbox', () => {
    it ('should handle tests from ejs website', () => {
        withBoxUnlocked(() => box.content.push("gold piece"));
          
        try {
            withBoxUnlocked(() => {
                throw new Error("Pirates on the horizon! Abort!");
            });
        } catch (e) {
            console.log("Error raised: " + e);
        }

        expect (box.locked).toBe(true);
        expect (() => box.content).toThrow();
        box.unlock();
        expect (box.locked).toBe(false);
        expect (box.content.length).toEqual(1);
    });
});