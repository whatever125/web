import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output} from '@angular/core';
import {TableModule} from "primeng/table";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {formatDate} from "@angular/common";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-results-table',
  standalone: true,
  imports: [
    TableModule,
    HttpClientModule,
    ButtonModule
  ],
  templateUrl: './results-table.component.html',
  styleUrl: './results-table.component.css'
})
export class ResultsTableComponent {
  @Input() results: {} | any = [];
  @Output() clearEvent = new EventEmitter<null>;

  protected readonly formatDate = formatDate;
  // locale: string;

  constructor(@Inject(LOCALE_ID) protected locale: string) {
    // this.locale = locale;
    // this.dateString = formatDate(Date.now(),'yyyy-MM-dd',this.locale);
  }

}
