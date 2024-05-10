import {Injectable, OnInit} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class MobileService  {

  public isMobile() {
    return  window.innerWidth < 839;
  }

  public isTablet() {
    return window.innerWidth >= 839 && window.innerWidth < 1182;
  }

  public isDesktop() {
    return window.innerWidth > 1182;
  }

}
