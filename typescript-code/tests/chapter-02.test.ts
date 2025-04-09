import {
    loopingATriangle,
    fizzBuzz,
    chessboard,
} from "../exercises/chapter-02";

describe ('loopingATriangle', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it ('logs an arbitrary number of rows', () => {
        const logSpy = jest.spyOn(console, 'log');
        loopingATriangle(1);
        expect(logSpy).toHaveBeenCalledWith('#');
        expect(logSpy).not.toHaveBeenCalledWith('##');
        expect(logSpy).toHaveBeenCalledTimes(1);
    });
    it ('logs a default 7 rows', () => {
        const logSpy = jest.spyOn(console, 'log');

        /*const logPromise = new Promise(() => loopingATriangle());
        return logPromise.then(() => {
            expect(logSpy).toHaveBeenCalledWith([
                '#',
                '##',
                '###',
                '####',
                '#####',
                '######',
                '#######',
            ]);
        });*/
        loopingATriangle();
        expect(logSpy).toHaveBeenCalledWith('#');
        expect(logSpy).toHaveBeenCalledWith('##');
        expect(logSpy).toHaveBeenCalledWith('###');
        expect(logSpy).toHaveBeenCalledWith('####');
        expect(logSpy).toHaveBeenCalledWith('#####');
        expect(logSpy).toHaveBeenCalledWith('######');
        expect(logSpy).toHaveBeenCalledWith('#######');
    });
});

describe ('fizzBuzz', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it ('executes expected fizzbuzz behavior', async () => {
        const logSpy = jest.spyOn(console, 'log');
        fizzBuzz();
        expect(logSpy).toHaveBeenCalledTimes(100);
        expect(logSpy).toHaveBeenCalledWith('FizzBuzz');
        expect(logSpy).toHaveBeenLastCalledWith('Buzz');
        expect(logSpy).not.toHaveBeenCalledWith('15');
    });
});

describe ('chessboard', () => {
    it ('defaults to a standard 8x8 chess board', () => {
        expect(chessboard()).toBe(` # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # `);
    });
    it ('returns an empty string if given 0', () => {
        expect(chessboard(0)).toBe('');
    });
    it ('handles arbitrary square sizes', () => {
        expect(chessboard(3)).toBe(' # \n# #\n # ');
    });
});