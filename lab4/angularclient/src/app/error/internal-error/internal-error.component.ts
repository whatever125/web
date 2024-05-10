import {Component, ErrorHandler} from '@angular/core';

@Component({
  selector: 'app-internal-error',
  standalone: true,
  imports: [],
  templateUrl: './internal-error.component.html',
  styleUrl: './internal-error.component.css'
})
export class InternalErrorComponent implements ErrorHandler {
  handleError(error: any): void {
    
  }

}
