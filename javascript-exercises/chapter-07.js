/**
 * Randomly selects and returns an element from given array.
 * @param {Array<any>} arr 
 * @returns {any} Random element from arr
 */
function randomPick (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const roads = [
    "Alice's House-Bob's House",    "Alice's House-Cabin",
    "Alice's House-Post Office",    "Bob's House-Town Hall",
    "Daria's House-Ernie's House",  "Daria's House-Town Hall",
    "Ernie's House-Grete's House",  "Grete's House-Farm",
    "Grete's House-Shop",           "Marketplace-Farm",
    "Marketplace-Post Office",      "Marketplace-Shop",
    "Marketplace-Town Hall",        "Shop-Town Hall",
];

/**
 * 
 * @param {Array<string>} edges 
 * @returns {Record<string,Array<string>}
 */
function buildGraph (edges) {
    const graph = Object.create(null);

    function addEdge (from, to) {
        if (!(from in graph)) graph[from] = [to];
        else graph[from].push(to);
    }

    for (const [from, to] of edges.map(edge => edge.split('-'))) {
        addEdge(from, to);
        addEdge(to, from);
    }

    return graph;
}

const roadGraph = buildGraph(roads);

export class VillageState {
    constructor (currentLocation, parcels) {
        this.location = currentLocation;
        this.parcels = parcels;
    }

    move (destination) {
        if (!roadGraph[this.location].includes(destination)) {
            throw new Error (
                `no road from ${this.location} to ${destination}`
            );
        }

        const parcels = this.parcels.map(p => {
            if (p.origin !== this.location) return p;
            return { origin: destination, deliveryAddress: p.deliveryAddress };
        }).filter(p => p.origin != p.deliveryAddress);

        return new VillageState(destination, parcels);
    }

    static random (parcelCount = 5) {
        const parcels = [];
        for (let i=0; i < parcelCount; i++) {
            const deliveryAddress = randomPick(Object.keys(roadGraph));
            let origin;
            do {
                origin = randomPick(Object.keys(roadGraph));
            } while (origin === deliveryAddress);
            parcels.push({ origin, deliveryAddress });
        }
        return new VillageState("Post Office", parcels);
    }
}

export function runRobot (state, robot, memory=[]) {
    let turn = 0;
    for (; state.parcels.length > 0; turn++) {
        const action = robot(state,memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
    console.log(`Done in ${turn} turns`);
    return turn;
}

export function randomRobot (state) {
    return { direction: randomPick(roadGraph[state.location]) };
}

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House", "Grete's House",
    "Shop", "Grete's House", "Farm", "Marketplace", "Post Office"
];

export function routeRobot (state, memory) {
    if (memory.length === 0) memory = mailRoute;
    return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute (graph,from,to) {
    const work = [{ at: from, route: [] }];
    for (let i=0; i < work.length; i++) {
        const { at, route } = work[i];
        for (const place of graph[at]) {
            if (place === to) return route.concat([place]);
            if (!work.some(w => w.at === place)) {
                work.push({ at: place, route: route.concat([place]) });
            }
        }
    }
    throw new Error (`exited for loop in findRoute without returning`);
}

export function goalOrientedRobot ({location, parcels}, route) {
    if (route.length === 0) {
        const parcel = parcels[0];
        if (parcel.origin !== location) {
            route = findRoute(roadGraph, location, parcel.origin);
        } else {
            route = findRoute(roadGraph, location, parcel.deliveryAddress);
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}

export function compareRobots (robot1, robot2, taskQuantity) {
    let robot1Steps = 0, robot2Steps = 0;
    for (let i = 0; i < taskQuantity; i++) {
        const task = VillageState.random();
        robot1Steps += runRobot(task, robot1, []);
        robot2Steps += runRobot(task, robot2, []);
    }
    robot1Steps /= taskQuantity, robot2Steps /= taskQuantity;
    console.log(
`Over ${taskQuantity} tasks:
${robot1.name}: ${robot1Steps},
${robot2.name}: ${robot2Steps}`
    );
    return [robot1Steps,robot2Steps];
}

// come back here to complete 'Robot Efficiency' exercise later

// exercise 'persistent group'
export class PGroup {
    #members;
    /**
     * 
     * @param {Array<any>} members 
     */
    constructor (members) {
        this.#members = members;
    }

    /**
     * Checks whether this has given item.
     * @param {any} item 
     * @returns {boolean} True if item is in this PGroup; false otherwise
     */
    has (item) {
        return this.#members.indexOf(item) > -1;
    }

    /**
     * 
     * @param {any} item 
     * @returns {PGroup}
     */
    add (item) {
        if (!this.has(item)) {
            return new PGroup (this.#members.concat([item]));
        } else return this;
    }

    /**
     * 
     * @param {any} item 
     * @returns {PGroup}
     */
    delete (item) {
        if (this.has(item)) {
            return new PGroup (this.#members.filter(v => v !== item));
        } else return this;
    }

    static empty = new this([]);
}