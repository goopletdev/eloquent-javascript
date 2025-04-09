class MultiplicatorUnitFailure extends Error {};

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns {number}
 * @throws {MultiplicatorUnitFailure} 80% of the time
 */
export function primitiveMultiply (x = Math.random()*10, y = Math.random()*10) {
    if (Math.random() >= .2) {
        throw new MultiplicatorUnitFailure();
    }
    return x * y;
}

export function retryRecursive (f = primitiveMultiply, ...args) {
    try {
        return f(...args);
    } catch (e) {
        if (e instanceof MultiplicatorUnitFailure) {
            return retryRecursive(f, ...args);
        } else {
            throw e;
        }
    }
}

export function retryLoop (f = primitiveMultiply, ...args) {
    for (;;) {
        try {
            return f(...args);
        } catch (e) {
            if (!(e instanceof MultiplicatorUnitFailure)) {
                throw e;
            } 
        }
    }
}

export const box = new class {
    locked = true;
    #content = [];

    unlock () { this.locked = false; }
    lock () { this.locked = true; }
    get content () {
        if (this.locked) throw new Error ("Locked!");
        return this.#content;
    }
};

export function withBoxUnlocked (f) {
    const after = box.locked ? box.lock : box.unlock;
    box.unlock();
    try {
        f();
    } catch (e) {
        console.log(e);
    } finally {
        after.call(box);
    }
}