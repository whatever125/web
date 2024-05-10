import { Component } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";
import {CardModule} from "primeng/card";
import {NgIf, NgStyle} from "@angular/common";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, PasswordModule, InputTextModule, DividerModule, CardModule, NgStyle, MessageModule, NgIf, MessagesModule, ToastModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  buttonClicked = "";

  constructor(protected axiosService: AxiosService, private router: Router, private messageService: MessageService) { }

  loginForm = new FormGroup({
    login: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_]{3,20}$'),
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      // Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{3,}$'),
    ])),
  });

  onSubmit(): void {
    if(this.buttonClicked === "login") {
      this.handleLogin();
    }
    if(this.buttonClicked === "register"){
      this.handleRegister();
    }

  }

  handleLogin() {
    let username = this.loginForm.value.login?.toLowerCase();
    let password = this.loginForm.value.password;
    if (typeof username == "string" && typeof password == "string") {
      let credentials = {username: username, password: password};

      this.axiosService.request(
        'post',
        '/auth/login',
        credentials
      ).then(value => {
        console.log("User logged in");
        this.axiosService.authenticate(true);
        this.axiosService.setAuthToken(value.data.token);
        this.axiosService.setUsername(credentials.username);
        this.router.navigateByUrl("/main");
        this.messageService.add({
          severity: 'success',
          summary: 'Вы успешно вошли',
          detail: '',
        });
      })
      .catch(reason => {
        console.log("Error logging in: ", reason.response);
        this.messageService.add({
          severity: 'error',
          summary: 'Не удается войти',
          detail: reason.response.data,
        });
        this.axiosService.authenticate(false);
      });

    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Некорректные данные',
        detail: ''
      });
      console.log("Login data error");
    }
  }

  handleRegister() {
    // alert(this.loginForm.value.login + ' | ' + this.loginForm.value.password);
    let username = this.loginForm.value.login?.toLowerCase();
    let password = this.loginForm.value.password;
    if (typeof username == "string" && typeof password == "string") {
      let credentials = {username: username, password: password};

      this.axiosService
        .request(
          'post',
          'auth/register',
          credentials)
        .then(value => {
          console.log("New user created");
          this.axiosService.setAuthToken(value.data.token);
          this.axiosService.authenticate(true);
          this.axiosService.setUsername(credentials.username);
          this.router.navigateByUrl("/main");
          this.messageService.add({
            severity: 'success',
            summary: 'Аккаунт создан',
            detail: 'Вы авторизованы',
          });
        })
        .catch(reason => {
          console.log("Error creating user: ", reason);
          this.messageService.add({
            severity: 'error',
            summary: 'Не удалось создать аккаунт',
            detail: reason.response.data,
          });
          this.axiosService.authenticate(false);
        });

    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Некорректные данные',
        detail: ''
      });
      console.log("login data error");
    }
  }

  handleLogout() {
    this.axiosService.authenticate(false);
    this.messageService.add({
      severity: 'info',
      summary: 'Вы вышли из аккаунта',
      detail: ''
    });
  }

  protected readonly outerWidth = outerWidth;
}
