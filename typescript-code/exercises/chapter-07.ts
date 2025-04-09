function randomPick (arr: Array<any>): any {
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

function buildGraph (edges: Array<string>): Graph {
    const graph = Object.create(null);

    function addEdge (from: string, to: string) {
        if (!(from in graph)) graph[from] = [];
        graph[from].push(to);
    }

    for (const [from, to] of edges.map(edge => edge.split('-'))) {
        addEdge(from, to);
        addEdge(to, from);
    }

    return graph;
}

const roadGraph = buildGraph(roads);

interface Parcel {
    origin: string;
    deliveryAddress: string;
}

export class VillageState {
    location: string;
    parcels: Array<Parcel>;

    constructor (currentLocation: string, parcels: Array<Parcel>) {
        this.location = currentLocation;
        this.parcels = parcels; 
    }

    move (destination: string): VillageState {
        if (!roadGraph[this.location].includes(destination)) {
            throw new Error (
                `no road from ${this.location} to ${destination}`
            );
            //return this;
        }

        const parcels = this.parcels.map(p => {
            if (p.origin != this.location) return p;
            return { origin: destination, deliveryAddress: p.deliveryAddress };
        }).filter(p => p.origin != p.deliveryAddress);

        return new VillageState(destination, parcels);
    }

    static random (parcelCount: number = 5): VillageState {
        const parcels: Array<Parcel> = [];
        for (let i=0; i < parcelCount; i++) {
            const deliveryAddress = randomPick(Object.keys(roadGraph));
            let origin: string;
            do {
                origin = randomPick(Object.keys(roadGraph));
            } while (origin === deliveryAddress);
            parcels.push({ origin, deliveryAddress });
        }
        return new VillageState("Post Office", parcels);
    }
}

type Memory = Array<string>;

export function runRobot (
    state: VillageState, 
    robot: Function, 
    memory?: Memory
) {
    let turn = 0;
    for (; state.parcels.length > 0; turn++) {
        const action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
    console.log(`Done in ${turn} turns`);
    return turn;
}

interface RobotOutput {
    direction: string;
    memory?: Memory;
}

export function randomRobot (state: VillageState): RobotOutput {
    return { direction: randomPick(roadGraph[state.location]) };
}

export const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House", "Grete's House",
    "Shop", "Grete's House", "Farm", "Marketplace", "Post Office"
];

export function routeRobot (
    state: VillageState, 
    memory: Memory
): RobotOutput {
    if (memory.length === 0) memory = mailRoute;
    return { direction: memory[0], memory: memory.slice(1) };
} 

type Graph = Record<string,Array<string>>;
interface Work {
    at: string;
    route: Array<string>;
}

function findRoute (graph: Graph, from: string, to: string): Array<string> {
    const work: Array<Work> = [{ at: from, route: [] }];
    for (let i=0; i < work.length; i++) {
        const { at, route } = work[i];
        for (const place of graph[at]) {
            if (place === to) return route.concat([place]);
            if (!work.some(w => w.at === place)) {
                work.push({ at: place, route: route.concat([place])});
            }
        }
    }
    throw new Error (`exited for loop in findRoute without returning`);
}

export function goalOrientedRobot(
    { location, parcels }: VillageState, 
    route: Array<string>
): RobotOutput {
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

export function compareRobots (
    robot1: Function, 
    robot2: Function,
    taskQuantity: number = 100
): [number,number] {
    let robot1Steps: number = 0, robot2Steps: number = 0;
    for (let i=0; i < taskQuantity; i++) {
        const task = VillageState.random();
        robot1Steps += runRobot(task,robot1,[]);
        robot2Steps += runRobot(task,robot2,[]);
    }
    robot1Steps /= taskQuantity, robot2Steps /= taskQuantity;
    console.log(
        `Over ${taskQuantity} tasks:
        ${robot1.name}: ${robot1Steps},
        ${robot2.name}: ${robot2Steps}`
    );
    return [robot1Steps,robot2Steps];
}