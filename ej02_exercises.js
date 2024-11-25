const ej2_1 = () => { // Looping a triangle
    for (let hashes = '#'; hashes.length < 8; hashes += '#') {
        console.log(hashes);
    }
}

const ej2_2 = () => { // FizzBuzz
    for (let n = 1; n <= 100; n++ ) {
        console.log(((n % 3 ? '' : 'Fizz') + (n % 5 ? '' : 'Buzz')) || n);
    }
}

const ej2_3 = () => { // Chessboard
    let board = '';
    let width = prompt('Width:','8');
    let height = prompt('Height:','8');

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            board += (x + y) % 2 ?'#' : ' ';
        }
        if (y + 1 !== height) board += '\n';
    }

    console.log(board);
}