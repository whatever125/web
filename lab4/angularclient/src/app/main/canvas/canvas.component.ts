import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input, OnChanges,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import ResultValidator from './resultValidator';
import {MobileService} from "../../services/mobile.service";

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent implements AfterViewInit, OnChanges {
  @Input() results = [];
  @Output() clickEvent: EventEmitter<{ x: number, y: number }> = new EventEmitter();

  constructor(private mobileService: MobileService) { }

  ngOnChanges(changes: SimpleChanges) {
    let previousResults = changes["results"]["previousValue"];
    if (previousResults == undefined) previousResults = [];
    if (previousResults.length < this.results.length) {
      if (this.radius > 0) {
        this.drawResult(this.results[0]);
      }
    } else {
      this.redraw();
    }
  }

  static MAX_RADIUS = 5;
  static UNIT_PC = 0.8 / (CanvasComponent.MAX_RADIUS * 2);
  static AREA_COLOR = "blue";
  static AXIS_COLOR = "black";
  static DPR = window.devicePixelRatio;

  @ViewChild('canvas', { static: true }) public canvas!: ElementRef;
  private width: any;
  private height: any;
  private radius = 0;
  private r_pc = 0;
  private WIDTH_PROPORTION = 0;

  ngAfterViewInit() {
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
    this.defineWidthProportion();
    this.redraw();
  }

  defineWidthProportion() {
    this.WIDTH_PROPORTION = this.mobileService.isMobile() ? (6 / 10) : this.mobileService.isTablet() ? (1 / 3) : (1 / 4);
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    // console.log('canvas is clicked');

    if (!(event.target instanceof Element)) return false;
    let rect = event.target.getBoundingClientRect();
    let x_coordinate = event.clientX - rect.left;
    let y_coordinate = event.clientY - rect.top;
    let [x, y] = this.coordsToAxis(x_coordinate, y_coordinate);
    x = parseFloat((x).toFixed(3));
    y = parseFloat((y).toFixed(3));

    this.clickEvent.emit({x: x, y: y});
    return true;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.defineWidthProportion();
    this.redraw();
  }

  public defineCanvas() {
    this.width = window.innerWidth * this.WIDTH_PROPORTION;
    this.height = window.innerWidth * this.WIDTH_PROPORTION;

    this.canvas.nativeElement.width = this.width * CanvasComponent.DPR;
    this.canvas.nativeElement.height = this.height * CanvasComponent.DPR;

    const ctx = this.canvas.nativeElement.getContext('2d');
    ctx.scale(CanvasComponent.DPR, CanvasComponent.DPR);
    this.canvas.nativeElement.style.width = `${this.width}px`;
    this.canvas.nativeElement.style.height = `${this.height}px`;
  }

  public clear() {
    const context = this.canvas.nativeElement.getContext('2d');
    context.clearRect(0, 0, this.width, this.height);
  }

  public setRadius(r: number) {
    this.radius = r;
    this.r_pc = (this.radius / CanvasComponent.MAX_RADIUS) * 0.4;
  }

  public redraw() {
    this.defineCanvas();
    this.drawAreas();
    this.drawGrid();
    if (this.radius > 0) {
      this.results.forEach(result => this.drawResult(result));
    }
  }

  drawAreas() {
    // init
    const ctx = this.canvas.nativeElement.getContext('2d');

    ctx.lineWidth = this.width * (2 / 300);

    ctx.fillStyle = CanvasComponent.AREA_COLOR;
    ctx.strokeStyle = CanvasComponent.AREA_COLOR;

    ctx.fillRect(this.width / 2, this.height / 2, this.r_pc * this.width, -(this.r_pc / 2) * this.height);

    this.drawTriangle(
      ctx,
      {x: (0.5 - this.r_pc / 2) * this.width,  y: this.height / 2},
      {x: this.width / 2,  y: this.height / 2},
      {x: this.width / 2,  y: (0.5 + this.r_pc / 2) * this.height},
      true
    );

    ctx.beginPath();
    ctx.moveTo(this.width / 2, this.height / 2);
    ctx.lineTo((0.5 + this.r_pc) * this.width, this.height / 2);
    ctx.arc(this.width / 2, this.height / 2, this.r_pc * this.width, 0, Math.PI / 2);
    ctx.lineTo(this.width / 2, (0.5 + this.r_pc) * this.height);
    ctx.fill();
  }

  drawGrid() {
    // init
    const ctx = this.canvas.nativeElement.getContext('2d');

    ctx.lineWidth = this.width * 2 / 500;
    ctx.font = "18px Verdana"; // todo

    ctx.fillStyle = CanvasComponent.AXIS_COLOR;
    ctx.strokeStyle = CanvasComponent.AXIS_COLOR;

    const arrow_height = 0.05 * this.width;

    // GRID
    // vertical axis
    this.drawLine(ctx, this.width / 2, 0, this.width / 2, this.height);

    // vertical axis arrow
    this.drawLine(ctx, this.width / 2, 0, this.width / 2 - arrow_height / 2, arrow_height);
    this.drawLine(ctx, this.width / 2, 0, this.width / 2 + arrow_height / 2, arrow_height);

    // vertical axis marks
    for (let i = 0; i <= CanvasComponent.MAX_RADIUS * 2; i ++) {
      if (i === CanvasComponent.MAX_RADIUS) continue;
      this.drawLine(ctx, this.width / 2 - 0.01 * this.width, (0.1 + i * CanvasComponent.UNIT_PC) * this.height,
        this.width / 2 + 0.01 * this.width, (0.1 + i * CanvasComponent.UNIT_PC) * this.height);
    }

    // horizontal axis
    this.drawLine(ctx, 0, this.height / 2, this.width, this.height / 2);

    // horizontal axis arrow
    this.drawLine(ctx, this.width, this.height / 2, this.width - arrow_height, this.height / 2 - arrow_height / 2);
    this.drawLine(ctx, this.width, this.height / 2, this.width - arrow_height, this.height / 2 + arrow_height / 2);

    // horizontal axis marks
    for (let i = 0; i <= CanvasComponent.MAX_RADIUS * 2; i ++) {
      if (i === CanvasComponent.MAX_RADIUS) continue;
      this.drawLine(ctx, (0.1 + i * CanvasComponent.UNIT_PC) * this.width, this.height / 2 - 0.01 * this.height,
        (0.1 + i * CanvasComponent.UNIT_PC) * this.width, this.height / 2 + 0.01 * this.height);
    }

    // axis numbers
    ctx.fillText(CanvasComponent.MAX_RADIUS.toString(), this.width / 2 + 8, (0.1) * this.height + 6);
    ctx.fillText(CanvasComponent.MAX_RADIUS.toString(), this.width - (0.1) * this.width - 6, this.height / 2 - 10);
  }

  drawLine(ctx: any, from_x: number, from_y: number, tox: number, toy: number) {
    ctx.beginPath();
    ctx.moveTo(from_x, from_y);
    ctx.lineTo(tox, toy);
    ctx.stroke();
  }

  drawTriangle(ctx: any, point1: {x: number, y: number}, point2: {x: number, y: number}, point3: {x: number, y: number}, filled: boolean) {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.lineTo(point3.x, point3.y);
    ctx.closePath();
    filled ? ctx.fill() : ctx.stroke();
  }

  drawResult(result: {x: number, y: number, r: number, success: boolean}) {
    let [dumb_x, dumb_y] = [(result.x / result.r) * this.radius, (result.y / result.r) * this.radius];
    let [x_coordinate, y_coordinate] = this.axisToCoords(dumb_x, dumb_y);
    const ctx = this.canvas.nativeElement.getContext('2d');
    ctx.beginPath();
    ctx.arc(x_coordinate, y_coordinate, this.width * (1 / 100), 0, 2 * Math.PI);
    ctx.fillStyle = result.success ? "#00AF54" : "#ff5275";
    ctx.fill();
    ctx.closePath();
  }

  coordsToAxis(x_coordinate: number, y_coordinate: number) {
    // console.log(x_coordinate, y_coordinate);
    y_coordinate = this.height - y_coordinate;
    let x, y;
    let unit_width = (0.8 * this.width) / (CanvasComponent.MAX_RADIUS * 2);
    let unit_height = (0.8 * this.height) / (CanvasComponent.MAX_RADIUS * 2);
    x_coordinate -= (0.1 * this.width);
    y_coordinate -= (0.1 * this.height);
    x = (x_coordinate / unit_width) - CanvasComponent.MAX_RADIUS;
    // x *= 10;
    // x = Math.round(x);
    // x /= 10;
    y = (y_coordinate / unit_height) - CanvasComponent.MAX_RADIUS;
    // console.log(x, y);
    return [x, y];
  }

  axisToCoords(x: number, y: number) {
    y = CanvasComponent.MAX_RADIUS - y;
    x += CanvasComponent.MAX_RADIUS;
    // console.log(x, y);
    let x_coordinate, y_coordinate;
    let unit_width = (0.8 * this.width) / (CanvasComponent.MAX_RADIUS * 2);
    let unit_height = (0.8 * this.height) / (CanvasComponent.MAX_RADIUS * 2);
    x_coordinate = (x * unit_width) + (0.1 * this.width);
    y_coordinate = (y * unit_height) + (0.1 * this.height);
    // console.log(x_coordinate, y_coordinate);
    return [x_coordinate, y_coordinate];
  }
}
