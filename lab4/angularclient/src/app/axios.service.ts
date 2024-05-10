import { Injectable } from '@angular/core';
import axios from 'axios';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }

  getUsername(): string | null {
    let username = window.localStorage.getItem("username");
    if (username !== null)
      return username;
    return null;
  }

  setUsername(username: string | null): void {
    if (username !== null) {
      window.localStorage.setItem("username", username);
    } else {
      window.localStorage.removeItem("username");
    }
  }

  authenticate(authenticated: boolean) {
    if (authenticated) {
      window.localStorage.setItem("authenticated", "true");
    } else {
      window.localStorage.setItem("authenticated", "false");
      this.setAuthToken(null);
      this.setUsername(null);
    }
  }

  isAuthenticated(): boolean {
    return window.localStorage.getItem("authenticated") === "true";
  }

  request(method: ('get' | 'post' | 'put' | 'delete' | 'head' | 'options'), url: string, data: any): Promise<any> {
    let headers: any = {};

    let authToken = this.getAuthToken();
    if (authToken !== null) {
      headers = {Authorization: "Bearer " + authToken};
    }

    return axios({
      method: method,
      headers: headers,
      url: url,
      data: data
    });
  }
}
