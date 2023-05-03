import { Component } from '@angular/core';
import { SnackbarService } from 'src/services/snackbar/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  constructor(public snackbarService: SnackbarService) {}
}
