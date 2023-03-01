import { Injectable } from '@angular/core';

export type WordItemType = {
  word: string;
  translation: string[];
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  words: WordItemType[] = [];
  constructor() {}

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
    const index = this.words.findIndex(item => item.word === word.word);

    if(index < 0) {
      this.words.push(word);
      this.setWords();
    }
  }
  
  deleteWord(word: WordItemType) {
    this.words = this.words.filter(item => item.word !== word.word);
    this.setWords();
  }
}
