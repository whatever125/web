export default class TextInput {
    id;
    input;

    constructor(id) {
        this.id = id;
        this.input = document.getElementById(id);
    }

    getValue() {
        return this.input.value;
    }

    clear() {
        this.input.value = "";
    }

    setValue(value) {
        this.input.value = value;
    }

    setValidityMessage(message) {
        this.input.setCustomValidity(message);
        this.input.reportValidity();
    }
}