export function range (
    start: number, end: number, step: number = 1
): Array<number> {
    const arr: Array<number> = [];
    for (let i=start; i <= end; i+=step) {
        arr.push(i);
    }
    return arr;
}

export function sum (nums: Array<number>): number {
    return nums.reduce((total,next) => total + next);
}

export function reverseArray (arr: Array<any>): Array<any> {
    const reversed: Array<any> = [];
    for (const element of arr) {
        reversed.unshift(element);
    }
    return reversed;
}

export function reverseArrayInPlace (arr: Array<any>): void {
    for (let [front,back]=[0,arr.length-1]; front<back; front++, back--) {
        [arr[front], arr[back]] = [arr[back], arr[front]];
    }
}

export interface List {
    value: number,
    rest: List | null,
}

export function arrayToList (values: Array<number>): List {
    return {
        value: values[0],
        rest: values.length > 1 ? arrayToList(values.slice(1)) : null,
    };
}

export function listToArray (list: List): Array<number> {
    return list.rest ? [list.value, ...listToArray(list.rest)] : [list.value];
}

export function prepend (value: number, list: List): List {
    return { value, rest: list, };
} 

export function nth (list: List | null, num: number): List | undefined {
    if (!list) return undefined;
    return num > 0 ? nth(list.rest, num-1) : list;
}

export function deepEqual (val1: any, val2: any): boolean {
    if (val1 === val2) return true;
    if (typeof val1 === 'object' && typeof val2 === 'object' && val1 && val2) {
        for (const key of Object.keys(val1)) {
            if (!deepEqual(val1[key], val2[key])) return false;
        }
        return true;
    } else return false;
}