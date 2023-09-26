import CheckboxGroup from './CheckboxGroup.js';
import Canvas from './Canvas.js';

export function selectOnlyThis(element) {
    const group = new CheckboxGroup("delta_r");
    const canvas = new Canvas("canvas");

    group.clearExcpetID(element.id);
    canvas.clear();
    if (element.checked) {
        canvas.drawAreas(parseFloat(element.value));
    } else {
        // myCheckbox[4].setCustomValidity("Please choose box");
        // myCheckbox[4].reportValidity();
    }
    canvas.drawGrid();
}