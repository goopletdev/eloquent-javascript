export function loopingATriangle (rows: number = 7): void {
    let row = '';
    do {
        console.log(row += '#');
    } while (row.length < rows);
}

export function fizzBuzz (): void {
    for (let i = 1; i <= 100; i++) {
        console.log((i % 3 ? '' : 'Fizz') + (i % 5 ? '' : 'Buzz') || `${i}`);
    }
}

export function chessboard (size: number = 8): string {
    let even = '', odd = '';
    for (let i=0; i < size; i++) {
        even += i % 2 ? '#' : ' ';
        odd += i % 2 ? ' ' : '#';
    }

    let board = even;
    for (let i=1; i < size; i++) {
        board += `\n${i % 2 ? odd : even}`;
    }

    return board;
}