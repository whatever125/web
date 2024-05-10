export default class Validator {
    static isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    static isValidX(x) {
        return this.isNumber(x) && Math.abs(Number(x)) <= 5;
    }

    static isValidY(y) {
        return this.isNumber(y) && (-3 <= Number(y) && Number(y) <= 5);
    }

    static isValidR(r) {
        return this.isNumber(r) && [1, 1.5, 2, 2.5, 3].includes(Number(r));
    }
}