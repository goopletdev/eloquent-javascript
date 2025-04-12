import {
    carCat,
    popProp,
    ferretFerryFerrari,
    endingInIous,
    spacePunctuation,
    wordLongerThanSix,
    wordWithoutE,
    replaceQuotes,
    numbersAgain,
} from '../javascript-exercises/chapter-09';

describe ('regexp golf', () => {
    test ('carCat', () => {
        expect(carCat.test('my car')).toBe(true);
        expect(carCat.test('bad cats')).toBe(true);
        expect(carCat.test('camper')).toBe(false);
        expect(carCat.test('high art')).toBe(false);
    });
    test ('popProp', () => {
        expect(popProp.test('pop culture')).toBe(true);
        expect(popProp.test('mad props')).toBe(true);
        expect(popProp.test('plop')).toBe(false);
        expect(popProp.test('prrrop')).toBe(false);
    });
    test ('ferretFerryFerrari', () => {
        expect(ferretFerryFerrari.test('ferret')).toBe(true);
        expect(ferretFerryFerrari.test('ferry')).toBe(true);
        expect(ferretFerryFerrari.test('ferrari')).toBe(true);
        expect(ferretFerryFerrari.test('ferrum')).toBe(false);
        expect(ferretFerryFerrari.test('transfer A')).toBe(false);
    });
    test ('endingInIous', () => {
        expect(endingInIous.test('how delicious')).toBe(true);
        expect(endingInIous.test('spacious room')).toBe(true);
        expect(endingInIous.test('ruinous')).toBe(false);
        expect(endingInIous.test('consciousness')).toBe(false);
    });
    test ('spacePunctuation', () => {
        expect(spacePunctuation.test('bad punctuation .')).toBe(true);
        expect(spacePunctuation.test('escape the period')).toBe(false);
    });
    test ('wordLongerThanSix', () => {
        expect(wordLongerThanSix.test('Siebentausenddreihundertzweiundzwanzig')).toBe(true);
        expect(wordLongerThanSix.test('no')).toBe(false);
        expect(wordLongerThanSix.test('three small words')).toBe(false);
    });
    test ('wordWithoutE', () => {
        expect(wordWithoutE.test('red platypus')).toBe(true);
        expect(wordWithoutE.test('wobbling nest')).toBe(true);
        expect(wordWithoutE.test('earth bed')).toBe(false);
        expect(wordWithoutE.test('bedrøvet abe')).toBe(false);
        expect(wordWithoutE.test('BEET')).toBe(false);
    });
});

describe ('quoting style', () => {
    test ('single quotes to double quotes', () => {
        const textBefore = "'I'm the cook,' he said, 'it's my job.'";
        const textAfter = "\"I'm the cook,\" he said, \"it's my job.\"";
        expect(textBefore.replace(replaceQuotes,'$1"$2')).toBe(textAfter);
    });
});

describe ('numbers again', () => {
    it ('matches JS numbers', () => {
        expect(numbersAgain.test('1')).toBe(true);
        expect(numbersAgain.test('-1')).toBe(true);
        expect(numbersAgain.test('+15')).toBe(true);
        expect(numbersAgain.test('1.55')).toBe(true);
        expect(numbersAgain.test('.5')).toBe(true);
        expect(numbersAgain.test('5.')).toBe(true);
        expect(numbersAgain.test('1.3e2')).toBe(true);
        expect(numbersAgain.test('1E-4')).toBe(true);
        expect(numbersAgain.test('1e+12')).toBe(true);

        expect(numbersAgain.test('1a')).toBe(false);
        expect(numbersAgain.test('+-1')).toBe(false);
        expect(numbersAgain.test('1.2.3')).toBe(false);
        expect(numbersAgain.test('1+1')).toBe(false);
        expect(numbersAgain.test('1e4.5')).toBe(false);
        expect(numbersAgain.test('.5.')).toBe(false);
        expect(numbersAgain.test('1f5')).toBe(false);
        expect(numbersAgain.test('.')).toBe(false);
    });
});