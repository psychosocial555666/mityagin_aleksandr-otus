import { Injectable } from '@angular/core';
import { WordItemType } from 'src/utils/types';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  words: WordItemType[] = [];
  constructor(private settingsService: SettingsService) {}

  getWords() {
    const stored = window.localStorage.getItem('words');
    if (!stored) return this.words;
    this.words = JSON.parse(stored);
    return this.words;
  }

  setWords() {
    const words = JSON.stringify(this.words);
    window.localStorage.setItem('words', words);
  }

  addWord(word: WordItemType) {
    const index = this.words.findIndex((item) => item.word === word.word);

    if (index < 0) {
      this.words.push(word);
      this.setWords();
    }
  }

  checkWordsNumber() {
    const settings = this.settingsService.getSettings();
    const wordsNumber = settings?.wordsNumber;
    if (wordsNumber && wordsNumber > this.words.length) {
      this.settingsService.setSettings({
        ...settings,
        wordsNumber: this.words.length,
      });
    }
  }

  deleteWord(word: WordItemType) {
    this.words = this.words.filter((item) => item.word !== word.word);
    this.checkWordsNumber();
    this.setWords();
  }
}
