import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {LoginFormComponent} from "./login-form/login-form.component";

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    HeaderComponent,
    LoginFormComponent
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {

}
