const ej03_1 = () => { // Minimum

    /**
     * Takes 2 numbers and returns the lower value
     * @param {number} arg1 
     * @param {number} arg2 
     * @returns {number} Lowest value
     */
    function min(arg1, arg2) {
        return arg1 < arg2 ? arg1 : arg2;
    }

    console.log(min(0, 10));
    console.log(min(0, -10));
}

const ej03_2 = () => { // Recursion

    /**
     * 
     * @param {number} num 
     * @returns {boolean}
     */
    function isEven(num) {
        num = num > 0 ? num : num * -1;
        if (num) return num === 1 ? false : isEven(num-2);
        else return true;
    }

    console.log(isEven(50));
    console.log(isEven(75));
    console.log(isEven(-1));
}

const ej03_3 = () => { // Bean counting
    function countChar(str, char) {
        let count = 0;
        for (i = 0; i < str.length; i++) {
            if (str[i] === char) count++;
        }
        return count;
    }

    function countBs(str) {
        return countChar(str, 'B');
    }

    console.log(countBs("BOB"));
    console.log(countChar("kakkerlak", "k"));

}