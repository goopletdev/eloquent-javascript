export function min (...args: Array<number>): number {
    return args.reduce((prev, current) => prev < current ? prev : current);
}

export function isEven (num: number): boolean {
    num = num < 0 ? -num : num;
    if (num === 0) return true;
    if (num === 1) return false;
    return isEven(num - 2);
}

export function countChar (reference: string, test: string): number {
    let count = 0;
    for (let char of reference) {
        if (char === test) count++;
    }
    return count;
}

export function countBs (reference: string): number {
    return countChar (reference, 'B');
}