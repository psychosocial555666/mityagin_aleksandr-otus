import { Component } from '@angular/core';
import { StoreService } from 'src/services/store/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public storeService: StoreService) {}
  navigationClickHandler(e: MouseEvent) {
    e.preventDefault();
  }
}
