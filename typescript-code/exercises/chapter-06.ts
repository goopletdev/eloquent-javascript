export class Vec {
    x: number;
    y: number;

    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    plus (vector: Vec): Vec {
        return new Vec (this.x + vector.x, this.y + vector.y);
    }

    minus (vector: Vec): Vec {
        return new Vec (this.x - vector.x, this.y - vector.y);
    }

    get length (): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

class GroupIterator {
    members: Array<any>;
    #position: number = 0;
    constructor (members: Array<any>) {
        this.members = members;
    }

    next () {
        if (this.#position === this.members.length) {
            return { done: true };
        }
        return { value: this.members[this.#position++], done: false };
    }
}

export class Group {
    #items: Array<any> = [];

    has (item: any): boolean {
        return this.#items.indexOf(item) > -1;
    }

    add (item: any) {
        if (!this.has(item)) this.#items.push(item);
    }

    delete (item: any) {
        if (this.has(item)) this.#items.splice(this.#items.indexOf(item), 1);
    }

    [Symbol.iterator]() {
        return new GroupIterator(this.#items);
    }

    static from (arr: Iterable<any>): Group {
        const group = new Group();
        for (const item of arr) {
            group.add(item);
        }
        return group;
    }
}