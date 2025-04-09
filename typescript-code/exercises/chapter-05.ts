export function flatten (arr: Array<Array<any>>): Array<any> {
    return arr.reduce((newArray, current) => newArray.concat(current));
}

export function loop (
    val: any, test: Function, update: Function, body: Function
): void {
    for (let value = val; test(value); value = update(value)) {
        body(value);
}
}

export function everyLoop (arr: Array<any>, f: Function): boolean {
    for (const val of arr) {
        if (!f(val)) return false;
    }
    return true;
}

export function everySome (arr: Array<any>, f: Function): boolean {
    return !arr.some(val => !f(val));
}

// 'Dominant Writing Direction' exercise relies on
// a body of code included on Eloquent JS website.