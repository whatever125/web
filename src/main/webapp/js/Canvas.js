export default class Canvas {
    static MAX_RADIUS = 5;
    static WIDTH_PROPORTION = 3 / 16;

    id;
    canvas;
    width;
    height;
    radius;

    constructor(id) {
        this.id = id;
        this.canvas = document.getElementById(id);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.radius = 3;
    }

    define() {
        this.width = window.innerWidth * Canvas.WIDTH_PROPORTION;
        this.height = window.innerWidth * Canvas.WIDTH_PROPORTION;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    clear() {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.width, this.height);
    }

    setRadius(r) {
        this.radius = r;
    }

    redraw() {
        this.drawAreas();
        this.drawGrid();
    }

    drawAreas() {
        // init
        const ctx = this.canvas.getContext('2d');

        const r_pc = (this.radius / Canvas.MAX_RADIUS) * 0.4;
        ctx.lineWidth = this.width * (2 / 300);

        const area_color = "#f9b17a";
        ctx.fillStyle = area_color;
        ctx.strokeStyle = area_color;

        ctx.fillRect((0.1 + (0.4 - r_pc) + r_pc / 2) * this.width, this.height / 2, (r_pc / 2) * this.width, r_pc * this.height);

        this.drawTriangle(ctx, {x: (0.5 - r_pc) * this.width,  y: this.height / 2}, {x: this.width / 2,  y: this.height / 2}, {x: this.width / 2,  y: (0.5 - r_pc) * this.height}, true);

        ctx.beginPath();
        ctx.moveTo(this.width / 2, this.height / 2);
        ctx.lineTo((0.5 + r_pc) * this.width, this.height / 2);
        ctx.arc(this.width / 2, this.height / 2, r_pc * this.width, 0, Math.PI / 2);
        ctx.lineTo(this.width / 2, (0.5 + r_pc) * this.height);
        ctx.fill();
    }

    drawGrid() {
        // init
        const ctx = this.canvas.getContext('2d');

        ctx.lineWidth = this.width * 2 / 500;
        ctx.font = "18px Verdana"; // todo

        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#ffffff";

        const arrow_height = 0.05 * this.width;

        // GRID
        // vertical axis
        this.drawLine(ctx, this.width / 2, 0, this.width / 2, this.height);

        // vertical axis arrow
        this.drawLine(ctx, this.width / 2, 0, this.width / 2 - arrow_height / 2, arrow_height);
        this.drawLine(ctx, this.width / 2, 0, this.width / 2 + arrow_height / 2, arrow_height);

        // vertical axis marks
        for (let i = 0; i <= Canvas.MAX_RADIUS * 2; i ++) {
            if (i === Canvas.MAX_RADIUS) continue;
            this.drawLine(ctx, this.width / 2 - 0.01 * this.width, (0.1 + i * 0.8 / (Canvas.MAX_RADIUS * 2)) * this.height,
                this.width / 2 + 0.01 * this.width, (0.1 + i * 0.8 / (Canvas.MAX_RADIUS * 2)) * this.height);
        }

        // horizontal axis
        this.drawLine(ctx, 0, this.height / 2, this.width, this.height / 2);

        // horizontal axis arrow
        this.drawLine(ctx, this.width, this.height / 2, this.width - arrow_height, this.height / 2 - arrow_height / 2);
        this.drawLine(ctx, this.width, this.height / 2, this.width - arrow_height, this.height / 2 + arrow_height / 2);

        // horizontal axis marks
        for (let i = 0; i <= Canvas.MAX_RADIUS * 2; i ++) {
            if (i === Canvas.MAX_RADIUS) continue;
            this.drawLine(ctx, (0.1 + i * 0.8 / (Canvas.MAX_RADIUS * 2)) * this.width, this.height / 2 - 0.01 * this.height,
                (0.1 + i * 0.8 / (Canvas.MAX_RADIUS * 2)) * this.width, this.height / 2 + 0.01 * this.height);
        }

        // axis numbers
        ctx.fillText(Canvas.MAX_RADIUS.toString(), this.width / 2 + 8, (0.1) * this.height + 6);
        ctx.fillText(Canvas.MAX_RADIUS.toString(), this.width - (0.1) * this.width - 6, this.height / 2 - 10);
    }

    drawLine(ctx, from_x, from_y, tox, toy) {
        ctx.beginPath();
        ctx.moveTo(from_x, from_y);
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