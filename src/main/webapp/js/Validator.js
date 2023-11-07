export default class Validator {
    static isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    static isValidX(x) {
        return this.isNumber(x) && [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2].includes(Number(x));
    }

    static isValidY(y) {
        return this.isNumber(y) && (-5 <= Number(y) && Number(y) <= 3);
    }

    static isValidR(r) {
        return this.isNumber(r) && [1, 2, 3, 4, 5].includes(Number(r));
    }
}