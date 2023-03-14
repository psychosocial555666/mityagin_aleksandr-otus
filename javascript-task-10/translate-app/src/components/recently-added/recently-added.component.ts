import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/services/store/store.service';
import { TranslateService } from 'src/services/translate/translate.service';
import { WordsService } from 'src/services/words/words.service';
import { WordItemType } from 'src/utils/types';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss'],
})
export class RecentlyAddedComponent implements OnInit {
  words: WordItemType[] = [];
  constructor(
    public storeService: StoreService,
    public wordsService: WordsService,
    public translateService: TranslateService
  ) {}
  ngOnInit(): void {
    this.words = this.storeService.getWords();
  }

  submitHandler(event: SubmitEvent, value: string) {
    event.preventDefault();
    this.wordsService.splitPhrase(value);
  }
}
