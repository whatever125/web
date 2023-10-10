export default class RadioGroup {
    groupName;
    radioButtons;

    constructor(groupName) {
        this.groupName = groupName;
        this.radioButtons = document.getElementsByName(groupName);
    }

    getSelectedValue() {
        const selectedRadio = document.querySelector(`input[type=radio][name="${this.groupName}"]:checked`);
        return selectedRadio ? selectedRadio.value : null;
    }

    clear() {
        this.radioButtons.forEach(el => el.checked = false);
    }

    defineCustomValidity() {
        let radioButton0 = this.radioButtons[0];
        this.radioButtons.forEach(function(radioButton) {
            radioButton.addEventListener('change', function() {
                radioButton0.setCustomValidity("");
                radioButton0.reportValidity();
            })
        });
    }

    setValidityMessage(id, message) {
        let radioButton = this.radioButtons[id];
        radioButton.setCustomValidity(message);
        radioButton.reportValidity();
    }

    isAnyChecked() {
        let isChecked = false;
        this.radioButtons.forEach(button => {
            if (button.checked) {
                isChecked = true;
            }
        });
        return isChecked;
    }
 
    get groupName() {
        return this.groupName;
    }
}