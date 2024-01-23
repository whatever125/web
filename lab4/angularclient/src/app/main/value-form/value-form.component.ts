import {Component, Directive, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl, ValidatorFn, Validator, NG_VALIDATORS
} from "@angular/forms";
import {ListboxModule} from "primeng/listbox";
import {SliderModule} from "primeng/slider";
import {ButtonModule} from "primeng/button";
import {CanvasComponent} from "../canvas/canvas.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import ResultValidator from "../canvas/resultValidator";
import {MessageModule} from "primeng/message";
import {NgIf} from "@angular/common";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-value-form',
  standalone: true,
  imports: [ReactiveFormsModule, ListboxModule, SliderModule, ButtonModule, HttpClientModule, MessageModule, NgIf],
  templateUrl: './value-form.component.html',
  styleUrl: './value-form.component.css'
})
export class ValueFormComponent {
  @Output() xChanged = new EventEmitter<number>();
  @Output() yChanged = new EventEmitter<number>();
  @Output() rChanged = new EventEmitter<number | null>();
  @Output() formSubmit = new EventEmitter<{ x: number, y: number, r: number }>();

  constructor(private messageService: MessageService) { }

  public classReference = ValueFormComponent;

  @Input() canvasComponent!: CanvasComponent;

  valueForm = new FormGroup({
    x: new FormControl(null, Validators.compose([
      Validators.required,
      validateX(),
    ])),
    y: new FormControl(0, Validators.compose([
      Validators.required,
      validateY(),
    ])),
    r: new FormControl(null, Validators.compose([
      Validators.required,
      validateR(),
    ])),
  });
  public static xValues = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
  public static minY = -3;
  public static maxY = 5;
  public static rValues = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];

  handleSubmit(x: any, y: any) {
    // console.log("value form handleLogin");

    if (!(typeof x == "number" && typeof y == "number"
      && ResultValidator.isValidX(x) && ResultValidator.isValidY(y))) {
      console.log("input error");
      return;
    }

    const r = this.valueForm.value.r;
    if (typeof r != "number") {
      this.messageService.add({
        severity: 'error',
        summary: 'Неполные данные',
        detail: 'Укажите радиус',
      });
      return;
    }
    if (!ResultValidator.isValidR(r)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Некорректное значение',
        detail: 'Радиус должен быть > 0',
      });
      return;
    }

    this.formSubmit.emit({x: x, y: y, r: r});
  }

  handleRChanged() {
    this.rChanged.emit(this.valueForm.value.r);
  }

  protected readonly console = console;
}

export function validateX(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null)
      return null;
    const valid = ValueFormComponent.xValues.indexOf(control.value) !== -1;
    return !valid ? { validateX: true }: null;
  };
}

export function validateY(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null)
      return null;
    const valid = control.value >= ValueFormComponent.minY && control.value <= ValueFormComponent.maxY;
    return !valid ? { validateY: true }: null;
  };
}

export function validateR(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null)
      return null;
    const valid = ValueFormComponent.rValues.indexOf(control.value) !== -1 && control.value > 0;
    return !valid ? { validateR: true } : null;
  };
}
