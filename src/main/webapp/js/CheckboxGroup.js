import {selectOnlyThis} from './checkBoxHandler.js';

export default class CheckboxGroup {
    groupName;
    checkboxes;

    constructor(groupName) {
        this.groupName = groupName;
        this.checkboxes = document.getElementsByName(groupName);
    }

    getSelectedValues() {
        const selectedCheckboxes = document.querySelectorAll(`input[type=checkbox][name="${this.groupName}"]:checked`);
        const values = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);
        return values;
    }

    clear() {
        this.checkboxes.forEach(el => el.checked = false);
    }

    clearExcpetID(id) {
        Array.prototype.forEach.call(this.checkboxes, function(el) {
            if (el.id != id) {
                el.checked = false;
            }
        });
    }

    isChecked(id) {
        Array.prototype.forEach.call(this.checkboxes, function(el) {
            if (el.id == id) {
                return el.checked;
            }
        });
        return false;
    }

    isAnyChecked() {
        let isChecked = false;
        this.checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                isChecked = true;
            }
        });
        return isChecked;
    }

    restrictSelectOne() {
        let checkbox0 = this.checkboxes[0];
        this.checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                checkbox0.setCustomValidity("");
                checkbox0.reportValidity();
                selectOnlyThis(checkbox);
            })
        });
    }

    setValidityMessage(id, message) {
        this.checkboxes[id].setCustomValidity(message);
        this.checkboxes[id].reportValidity();
    }

    select(id) {
        this.checkboxes[id].checked = true;
    }
 
    get groupName() {
        return this.groupName;
    }
}