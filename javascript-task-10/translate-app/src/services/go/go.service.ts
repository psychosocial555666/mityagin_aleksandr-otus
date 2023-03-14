import { Injectable } from '@angular/core';
import { getArrayRandElement } from 'src/utils/methods';
import { WordItemType } from 'src/utils/types';
import { SettingsService } from '../settings/settings.service';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class GoService {
  private step: number;
  private currentWord: WordItemType | null;
  private usedWords: string[] = [];
  public isCorrect: boolean = false;
  public isFinished: boolean = false;
  constructor(
    private settingsService: SettingsService,
    private storeService: StoreService
  ) {
    this.step = 1;
    this.currentWord = null;
  }

  increaseStep() {
    const max = this.settingsService.getSettings()?.wordsNumber;
    if (max && this.step < max) {
      this.step = this.step + 1;
    } else {
      this.isFinished = true;
    }
  }

  getStep() {
    return this.step;
  }

  setStep(step: number) {
    this.step = step;
  }

  getCurrentWord() {
    return this.currentWord;
  }

  getRandomWord() {
    const words = this.storeService
      .getWords()
      .filter((word) => !this.usedWords.includes(word.word));
    if (words.length) {
      this.currentWord = getArrayRandElement(words);
      this.usedWords.push(this.currentWord.word);
      return this.currentWord.word;
    }
    return '';
  }

  checkAnswer(answer: string) {
    if (this.currentWord && this.currentWord.translation.includes(answer)) {
      this.isCorrect = true;
    } else {
      this.isCorrect = false;
    }
  }

  goToNext() {
    this.increaseStep();
    this.getRandomWord();
    this.isCorrect = false;
  }

  reset() {
    this.setStep(1);
    this.isFinished = false;
    this.usedWords = [];
    this.getRandomWord();
  }
}
