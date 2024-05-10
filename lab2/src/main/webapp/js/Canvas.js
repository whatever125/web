export default class Canvas {
    static MAX_RADIUS = 5;
    static UNIT_PC = 0.8 / (Canvas.MAX_RADIUS * 2);
    static WIDTH_PROPORTION = 4 / 16;
    static AREA_COLOR = "#f9b17a";
    static AXIS_COLOR = "#ffffff";
    static DPR = window.devicePixelRatio;

    constructor(id) {
        this.id = id;
        this.canvas = document.getElementById(id);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.radius = 0;
        this.r_pc = 0;
    }

    defineCanvas() {
        this.width = window.innerWidth * Canvas.WIDTH_PROPORTION;
        this.height = window.innerWidth * Canvas.WIDTH_PROPORTION;

        this.canvas.width = this.width * Canvas.DPR;
        this.canvas.height = this.height * Canvas.DPR;

        const ctx = this.canvas.getContext('2d');
        ctx.scale(Canvas.DPR, Canvas.DPR);
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
    }

    clear() {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.width, this.height);
    }

    setRadius(r) {
        this.radius = r;
        this.r_pc = (this.radius / Canvas.MAX_RADIUS) * 0.4;
    }

    redraw() {
        this.defineCanvas();
        this.drawAreas();
        this.drawGrid();
    }

    drawAreas() {
        // init
        const ctx = this.canvas.getContext('2d');

        ctx.lineWidth = this.width * (2 / 300);

        ctx.fillStyle = Canvas.AREA_COLOR;
        ctx.strokeStyle = Canvas.AREA_COLOR;

        ctx.fillRect(this.width / 2, this.height / 2, this.r_pc * this.width, (this.r_pc / 2) * this.height);

        this.drawTriangle(ctx, {x: (0.5 - this.r_pc) * this.width,  y: this.height / 2}, {x: this.width / 2,  y: this.height / 2}, {x: this.width / 2,  y: (0.5 + this.r_pc) * this.height}, true);

        ctx.beginPath();
        ctx.moveTo(this.width / 2, this.height / 2);
        ctx.lineTo((0.5 + this.r_pc) * this.width, this.height / 2);
        ctx.arc(this.width / 2, this.height / 2, this.r_pc * this.width, -Math.PI / 2, 0);
        ctx.lineTo(this.width / 2, (0.5 - this.r_pc) * this.height);
        ctx.fill();
    }

    drawGrid() {
        // init
        const ctx = this.canvas.getContext('2d');

        ctx.lineWidth = this.width * 2 / 500;
        ctx.font = "18px Verdana"; // todo

        ctx.fillStyle = Canvas.AXIS_COLOR;
        ctx.strokeStyle = Canvas.AXIS_COLOR;

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
            this.drawLine(ctx, this.width / 2 - 0.01 * this.width, (0.1 + i * Canvas.UNIT_PC) * this.height,
                this.width / 2 + 0.01 * this.width, (0.1 + i * Canvas.UNIT_PC) * this.height);
        }

        // horizontal axis
        this.drawLine(ctx, 0, this.height / 2, this.width, this.height / 2);

        // horizontal axis arrow
        this.drawLine(ctx, this.width, this.height / 2, this.width - arrow_height, this.height / 2 - arrow_height / 2);
        this.drawLine(ctx, this.width, this.height / 2, this.width - arrow_height, this.height / 2 + arrow_height / 2);

        // horizontal axis marks
        for (let i = 0; i <= Canvas.MAX_RADIUS * 2; i ++) {
            if (i === Canvas.MAX_RADIUS) continue;
            this.drawLine(ctx, (0.1 + i * Canvas.UNIT_PC) * this.width, this.height / 2 - 0.01 * this.height,
                (0.1 + i * Canvas.UNIT_PC) * this.width, this.height / 2 + 0.01 * this.height);
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

    drawResult(result) {
        let [dumb_x, dumb_y] = [(result.x / result.r) * this.radius, (result.y / result.r) * this.radius];
        let [x_coordinate, y_coordinate] = this.axisToCoords(dumb_x, dumb_y);
        const ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(x_coordinate, y_coordinate, this.width * (1 / 100), 0, 2 * Math.PI);
        ctx.fillStyle = result.success ? "#00AF54" : "#ff5275";
        ctx.fill();
        ctx.closePath();
    }

    coordsToAxis(x_coordinate, y_coordinate) {
        // console.log(x_coordinate, y_coordinate);
        y_coordinate = this.height - y_coordinate;
        let x, y;
        let unit_width = (0.8 * this.width) / (Canvas.MAX_RADIUS * 2);
        let unit_height = (0.8 * this.height) / (Canvas.MAX_RADIUS * 2);
        x_coordinate -= (0.1 * this.width);
        y_coordinate -= (0.1 * this.height);
        x = (x_coordinate / unit_width) - Canvas.MAX_RADIUS;
        x *= 2;
        x = Math.round(x);
        x /= 2;
        y = (y_coordinate / unit_height) - Canvas.MAX_RADIUS;
        // console.log(x, y);
        return [x, y];
    }

    axisToCoords(x, y) {
        y = Canvas.MAX_RADIUS - y;
        x += Canvas.MAX_RADIUS;
        // console.log(x, y);
        let x_coordinate, y_coordinate;
        let unit_width = (0.8 * this.width) / (Canvas.MAX_RADIUS * 2);
        let unit_height = (0.8 * this.height) / (Canvas.MAX_RADIUS * 2);
        x_coordinate = (x * unit_width) + (0.1 * this.width);
        y_coordinate = (y * unit_height) + (0.1 * this.height);
        // console.log(x_coordinate, y_coordinate);
        return [x_coordinate, y_coordinate];
    }
}