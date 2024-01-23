export default class ResultValidator {
  static isValidX(x: number) {
    // return Math.abs(Number(x)) <= 5;
    return true;
  }

  static isValidY(y: number) {
    // return (-3 <= Number(y) && Number(y) <= 5);
    return true;
  }

  static isValidR(r: number) {
    return [0.5, 1.0, 1.5, 2.0].includes(r);
  }
}
