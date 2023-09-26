export default class Canvas {
    id;
    canvas;
    width;
    height;

    constructor(id) {
        this.id = id;
        this.canvas = document.getElementById(id);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    define() {
        this.width = window.innerWidth * 0.2;
        this.height = this.width;

        canvas.width = this.width;
        canvas.height = this.height;
    }

    clear() {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.width, this.height);
    }

    drawAreas(r) {
        var ctx = this.canvas.getContext('2d');

        // ctx.c

        var r_pc = (r / 3) * 0.4;
        ctx.lineWidth = this.width * 2 / 300;

        // blue areas
        var area_color = "#f9b17a";
        ctx.fillStyle = area_color;
        ctx.strokeStyle = area_color;

        ctx.fillRect((0.1 + (0.4 - r_pc) + r_pc / 2) * this.width, this.height / 2, (r_pc / 2) * this.width, r_pc * this.height);

        this.drawTriangle(ctx, {x: (0.1 + (0.4 - r_pc)) * this.width,  y: this.height / 2}, {x: this.width / 2,  y: this.height / 2}, {x: this.width / 2,  y: (0.1 + (0.4 - r_pc)) * this.height}, true);

        ctx.beginPath();
        ctx.moveTo(this.width / 2, this.height / 2);
        ctx.lineTo((0.5 + r_pc) * this.width, this.height / 2);
        ctx.arc(this.width / 2, this.height / 2, r_pc * this.width, 0, Math.PI / 2);
        ctx.lineTo(this.width / 2, (0.5 + r_pc) * this.height);
        ctx.fill();
    }

    drawGrid() {
        var ctx = this.canvas.getContext('2d');

        ctx.lineWidth = this.width * 2 / 500;
        ctx.font = "18px Verdana"; // todo

        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#ffffff";

        // grid
        var arrow_height = 0.05 * this.width;

        this.drawLine(ctx, this.width / 2, 0, this.width / 2, this.height);

        this.drawLine(ctx, this.width / 2, 0, this.width / 2 - arrow_height / 2, arrow_height);
        this.drawLine(ctx, this.width / 2, 0, this.width / 2 + arrow_height / 2, arrow_height);

        this.drawLine(ctx, this.width / 2 - 0.01 * this.width, (0.1 + 0 * 0.8 / 6) * this.height, this.width / 2 + 0.01 * this.width, (0.1 + 0 * 0.8 / 6) * this.height);
        this.drawLine(ctx, this.width / 2 - 0.01 * this.width, (0.1 + 1 * 0.8 / 6) * this.height, this.width / 2 + 0.01 * this.width, (0.1 + 1 * 0.8 / 6) * this.height);
        this.drawLine(ctx, this.width / 2 - 0.01 * this.width, (0.1 + 2 * 0.8 / 6) * this.height, this.width / 2 + 0.01 * this.width, (0.1 + 2 * 0.8 / 6) * this.height);
        this.drawLine(ctx, this.width / 2 - 0.01 * this.width, (0.1 + 4 * 0.8 / 6) * this.height, this.width / 2 + 0.01 * this.width, (0.1 + 4 * 0.8 / 6) * this.height);
        this.drawLine(ctx, this.width / 2 - 0.01 * this.width, (0.1 + 5 * 0.8 / 6) * this.height, this.width / 2 + 0.01 * this.width, (0.1 + 5 * 0.8 / 6) * this.height);
        this.drawLine(ctx, this.width / 2 - 0.01 * this.width, (0.1 + 6 * 0.8 / 6) * this.height, this.width / 2 + 0.01 * this.width, (0.1 + 6 * 0.8 / 6) * this.height);

        this.drawLine(ctx, 0, this.height / 2, this.width, this.height / 2);

        this.drawLine(ctx, this.width, this.height / 2, this.width - arrow_height, this.height / 2 - arrow_height / 2);
        this.drawLine(ctx, this.width, this.height / 2, this.width - arrow_height, this.height / 2 + arrow_height / 2);

        this.drawLine(ctx, (0.1 + 0 * 0.8 / 6) * this.width, this.height / 2 - 0.01 * this.height, (0.1 + 0 * 0.8 / 6) * this.width, this.height / 2 + 0.01 * this.height);
        this.drawLine(ctx, (0.1 + 1 * 0.8 / 6) * this.width, this.height / 2 - 0.01 * this.height, (0.1 + 1 * 0.8 / 6) * this.width, this.height / 2 + 0.01 * this.height);
        this.drawLine(ctx, (0.1 + 2 * 0.8 / 6) * this.width, this.height / 2 - 0.01 * this.height, (0.1 + 2 * 0.8 / 6) * this.width, this.height / 2 + 0.01 * this.height);
        this.drawLine(ctx, (0.1 + 4 * 0.8 / 6) * this.width, this.height / 2 - 0.01 * this.height, (0.1 + 4 * 0.8 / 6) * this.width, this.height / 2 + 0.01 * this.height);
        this.drawLine(ctx, (0.1 + 5 * 0.8 / 6) * this.width, this.height / 2 - 0.01 * this.height, (0.1 + 5 * 0.8 / 6) * this.width, this.height / 2 + 0.01 * this.height);
        this.drawLine(ctx, (0.1 + 6 * 0.8 / 6) * this.width, this.height / 2 - 0.01 * this.height, (0.1 + 6 * 0.8 / 6) * this.width, this.height / 2 + 0.01 * this.height);

        // grid numbers
        ctx.fillText("3", this.width / 2 + 8, (0.1) * this.height + 6);
        ctx.fillText("3", this.width - (0.1) * this.width - 6, this.height / 2 - 10);
    }

    drawLine(ctx, fromx, fromy, tox, toy) {
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();
    }

    drawTriangle(ctx, point1, point2, point3, filled) {
        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.lineTo(point3.x, point3.y);
        ctx.closePath();
        filled ? ctx.fill() : ctx.stroke();
    }
}