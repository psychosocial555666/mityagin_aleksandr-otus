import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/services/store/store.service';
import { TranslateService } from 'src/services/translate/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public storeService: StoreService, public translateService: TranslateService) { }
  ngOnInit(): void {
    console.log('init')
    // this.translateService.requestTranslation('Hello')
  }
}
