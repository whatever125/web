import CheckboxGroup from './CheckboxGroup.js';
import Canvas from './Canvas.js';

export function selectOnlyThis(element) {
    const group = new CheckboxGroup("delta_r");
    const canvas = new Canvas("canvas");

    group.clearExcpetID(element.id);
    canvas.clear();
    if (element.checked) {
        canvas.setRadius(parseFloat(element.value));
    } else {
        canvas.setRadius(0);
    }
    canvas.redraw();
}