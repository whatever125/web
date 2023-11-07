export default class Selector {
    id;
    selector;

    constructor(id) {
        this.id = id;
        this.selector = document.getElementById(id);
    }

    getValue() {
        return this.selector.value;
    }

    setValidityMessage(message) {
        this.selector.setCustomValidity(message);
        this.selector.reportValidity();
    }
}