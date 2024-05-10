import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {ValueFormComponent} from "./value-form/value-form.component";
import {CanvasComponent} from "./canvas/canvas.component";
import {ResultsTableComponent} from "./results-table/results-table.component";
import {HttpClient} from "@angular/common/http";
import {AxiosService} from "../axios.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HeaderComponent,
    ValueFormComponent,
    CanvasComponent,
    ResultsTableComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements AfterViewInit {
  @ViewChild(CanvasComponent) canvasComponent!: CanvasComponent;
  results: any = [];

  constructor(protected axiosService: AxiosService) { }

  ngAfterViewInit() {
    this.retrieveResults();
  }

  retrieveResults() {
    this.axiosService.request(
      'get',
      '/results',
      null
    ).then(data => {
      this.results = data["data"];
      this.results.reverse();
    }).catch(error => {
      console.log("Error fetching results: ", error)
    });
  }

  formSubmit(data: {x: number, y: number, r: number}) {
    this.axiosService.request(
      'post',
      '/results',
      data
    ).then((data: any) => {
      if (data["data"] != null) {
        this.canvasComponent.drawResult(data["data"]);
        this.results = [data["data"]].concat(this.results);
        // this.retrieveResults();
      } else {
        console.log("error response");
      }
    }).catch(err => {
      console.log("Error submitting data: ", err)
    });
    // this.http
    //   .post("http://localhost:8080/results", data)
    //   .subscribe({
    //     next: (data: any) => {
    //       if (data != null) {
    //         this.canvasComponent.drawResult(data);
    //         this.retrieveResults();
    //       } else {
    //         console.log("error response");
    //       }
    //     },
    //     error: err => console.log("Error submitting data: ", err),
    //   });
  }

  rChanged(r: number | null) {
    if (typeof r == "number" && r >= 0) {
      this.canvasComponent.setRadius(r);
      this.canvasComponent.redraw();
    } else {
      this.canvasComponent.setRadius(0);
      this.canvasComponent.redraw();
    }
  }

  clearResults() {
    this.axiosService.request(
      'delete',
      '/results',
      null
    ).then(() => {
      this.results = [...[]];
      this.canvasComponent.redraw();
    }).catch(reason => {
      console.log("Couldn't clear results: ", reason);
    });
  }

  protected readonly console = console;
}
