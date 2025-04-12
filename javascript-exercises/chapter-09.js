export const carCat = /ca[rt]/;
export const popProp = /pr?op/;
export const ferretFerryFerrari = /ferr(et|y|ari)/;
export const endingInIous = /ious(\s|$)/u;
/**
 * @type {RegExp} a whitespace character followed by a period, 
 * comma, colon, or semicolon
 */
export const spacePunctuation = /\s[.,:;]/;
export const wordLongerThanSix = /\p{L}{7}/u;
export const wordWithoutE = /(^|\s)[^e]+($|\s)/ui;


export const replaceQuotes = /(^|\P{L})'|'($|\P{L})/gu;

export const numbersAgain = /^[+\-]?(\.?\d+|\d+\.?\d*)(e[\-+]?\d+)?$/i;