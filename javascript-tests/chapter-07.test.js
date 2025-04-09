import {
    runRobot,
    VillageState,
    randomRobot,
    routeRobot,
    mailRoute,
    goalOrientedRobot,
    PGroup,
} from '../javascript-exercises/chapter-07';

describe ('VillageState', () => {
    it ('creates a new VillageState without altering the old one', () => {
        const first = new VillageState(
            "Post Office",
            [{ origin: "Post Office", deliveryAddress: "Alice's House" }]
        );
        const next = first.move("Alice's House");

        expect(next.location).toEqual("Alice's House");
        expect(next.parcels).toEqual([]);
        expect(first.location).toEqual("Post Office");
    });
});

describe ('robots', () => {
    test ('randomRobot', () => {
        const logSpy = jest.spyOn(console, 'log');
        jest.clearAllMocks();
        runRobot(VillageState.random(), randomRobot);
        expect(logSpy).toHaveBeenCalled();
    });
    test ('routeRobot', () => {
        const logSpy = jest.spyOn(console, 'log');
        jest.clearAllMocks();
        runRobot(VillageState.random(), routeRobot, []);
        expect(logSpy).toHaveBeenCalled();
    });
    test ('goalOrientedRobot', () => {
        const logSpy = jest.spyOn(console, 'log');
        jest.clearAllMocks();
        runRobot(VillageState.random(), goalOrientedRobot, []);
    });
});

describe ('PGroup', () => {
    it ('should pass the test cases given on the website', () => {
        let a = PGroup.empty.add("a");
        let ab = a.add("b");
        let b = ab.delete("a");
        
        expect(a.has('a')).toBe(true);
        expect(ab.has("a")).toBe(true);
        expect(ab.has("b")).toBe(true);
        expect(b.has("b")).toBe(true);
        expect(a.has("b")).toBe(false);
        expect(b.has("a")).toBe(false);
    });
});