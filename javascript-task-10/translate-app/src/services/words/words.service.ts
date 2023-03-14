import { Injectable } from '@angular/core';
import { TranslateService } from '../translate/translate.service';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(public translateService: TranslateService) {}

  splitPhrase(string: string) {
    string.split(' ').forEach((word) => {
      this.translateService.requestTranslation(word.toLowerCase());
    });
  }
}
