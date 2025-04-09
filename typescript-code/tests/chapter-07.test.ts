import {
    runRobot,
    VillageState,
    randomRobot,
    routeRobot,
    mailRoute,
    goalOrientedRobot,
} from '../exercises/chapter-07';

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

