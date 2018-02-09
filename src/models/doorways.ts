import { getRandomInt, equals } from '../helpers/random';

// type Doorway2 = [number, number, number, number];

interface Doorway {
    from: [number, number];
    to: [number, number];
}

type Direction = 'N' | 'S' | 'E' | 'W';
enum DirectionEnum { N = 1, S, E, W }

export class Doorways {

    private doorways: Doorway[] = [];
    private mapGridSize: [number, number] = [10, 10];

    constructor(roomCount: number = 15, mapGridSize: [number, number]) {
        this.mapGridSize = mapGridSize;
        if (roomCount < 1) {
            roomCount = 5;
        }

        if (roomCount === 1) {
            mapGridSize = [0, 0];
        }

        const startingRoom: [number, number] = [
            getRandomInt(1, this.mapGridSize[0] - 1),
            getRandomInt(1, this.mapGridSize[1] - 1)
        ];

         // let counter = 0;

        // let gridArea = mapGridSize[1] + 1 * mapGridSize[0] + 1;

        // FIXME: recursive method call. not perfect!
        this.createDoorways(roomCount, startingRoom);

        // let room: [number, number] = startingRoom;

        // const onGrid = (roomFrom: [number, number], direction: Direction): boolean => {
            // functionality if the room is not on map...return pathing to start of path.
            // if (roomFrom[0] < 0 ||
            //     roomFrom[1] < 0 ||
            //     roomFrom[0] > this.mapGridSize[0] ||
            //     roomFrom[1] > this.mapGridSize[1]
            // ) {
            //     // FIXME: this function needs access to set the starting room currently fix that. 
            //     room = randomShift;
            //     return false;
            // }
            // let roomTo = this.roomToFromDirection(roomFrom, direction);
            // if (roomTo[0] < 0 ||
            //     roomTo[1] < 0 ||
            //     roomTo[0] > this.mapGridSize[0] ||
            //     roomTo[1] > this.mapGridSize[1]
            // ) {
            //     room = startingRoom;
            //     return false;
            // }

            // return true;
        // };

        // while (counter <= gridArea && this.numberOfDoorways() <= roomCount) {

        //     let direction = <Direction>DirectionRand[getRandomInt(1, 4)];

        //     if (!this.isDoorway(room, direction) && onGrid(room, direction)) {

        //         this.addDoorway(room, direction);

        //         if (this.numberOfDoorways() > 2) {
        //             let randomRoom = this.randomDoorway();
        //             let roomRandomizer = [randomRoom.from, randomRoom.to];
        //             // room = randomRoom.from;
        //             room = roomRandomizer[getRandomInt(0, 1)];
        //         }
        //         room = this.lastDoorway().to;
        //     }
        //     counter++;
        // }
    }

    // FIXME: complete recursive solution

        createDoorways = (roomCount: number, room: [number, number] ): any => {
            if (this.numberOfDoorways() >= roomCount) {
                return;
            }

            const validDirections = [];
            for (let direction in DirectionEnum) {
                if (!Number(direction) && 
                this.isDoorwayonGrid(room, <Direction> direction) && 
                !this.isDoorway(room, <Direction> direction)
            )   {
                    validDirections.push(direction);
                }
            }

            const randomLoop = Math.floor(Math.random() * validDirections.length);
            let availableDirection = validDirections.splice(randomLoop, getRandomInt(0, validDirections.length));
            
            // const availableDirection = [];
            for (let i = 0; i < randomLoop; i++) {
                const randomIndex = Math.floor(Math.random() * validDirections.length);
                availableDirection.push(validDirections.splice(randomIndex, 1)[0]);
            }

            for (let direction of availableDirection) {
                    this.addDoorway(room, <Direction> direction);
                    room = this.roomToFromDirection(room, <Direction> direction);
                    this.createDoorways(roomCount, room);
            }
        }

    getConnectedDoorways = (room: [number, number]) => {
        return this.doorways.filter(doorway =>
            equals(doorway.to, room) || equals(doorway.from, room));
    }

    isDoorwayonGrid = (roomFrom: [number, number], direction: Direction): boolean => {
        let roomTo = this.roomToFromDirection(roomFrom, direction);
        if (roomTo[0] < 0 ||
            roomTo[1] < 0 ||
            roomTo[0] > this.mapGridSize[0] ||
            roomTo[1] > this.mapGridSize[1]
        ) {
            return false;
        }

        return true;
    }

    // private randomDoorway = () => this.doorways[getRandomInt(0, this.numberOfDoorways() - 1)];

    private numberOfDoorways = () => this.doorways.length;

    // private lastDoorway = () => this.doorways[this.numberOfDoorways() - 1];

    private isDoorway = (room: [number, number], direction: Direction): boolean => {
        let normDoor = this.normalizeDoorway({
            from: room,
            to: this.roomToFromDirection(room, direction)
        });
        return this.doorways.find(
            doorway =>
                equals(doorway.from, normDoor.from) &&
                equals(normDoor.to, doorway.to)) !== undefined;
    }

    private addDoorway = (room: [number, number], direction: Direction) =>
        this.doorways.push(this.normalizeDoorway({
            from: room,
            to: this.roomToFromDirection(room, direction)
        })
        )

    private roomToFromDirection = (room: [number, number], direction: Direction): [number, number] => {
        switch (direction) {
            case 'S':
                return [room[0], room[1] + 1];
            case 'N':
                return [room[0], room[1] - 1];
            case 'E':
                return [room[0] + 1, room[1]];
            case 'W':
                return [room[0] - 1, room[1]];
            default:
                return room;
        }
    }

    private normalizeDoorway(
        doorway: Doorway
    ) {
        return (doorway.from[1] > doorway.to[1] || doorway.from[0] > doorway.to[0])
            ? { from: doorway.to, to: doorway.from }
            : doorway;
    }
}
// TODO: Create Rooms based on doorways. 
