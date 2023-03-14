import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';

const settings = {
  wordsNumber: 2,
  language: 'en|ru',
};

const newWord = {
  word: 'new',
  translation: ['новый'],
};

const newWord2 = {
  word: 'word',
  translation: ['слово'],
};

const newWord3 = {
  word: 'world',
  translation: ['мир'],
};

describe('StoreService', () => {
  let service: StoreService;
  let storeService: StoreService;

  const settingsServiceSpy = jasmine.createSpyObj('settingsService', [
    'getSettings',
    'setSettings',
  ]);
  settingsServiceSpy.getSettings.and.returnValue(settings);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
    storeService = new StoreService(settingsServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and get words', () => {
    storeService.addWord(newWord);
    expect(storeService.getWords()).toEqual([newWord]);
    storeService.addWord(newWord2);
    expect(storeService.getWords()).toEqual([newWord, newWord2]);
  });

  it('should not add same word', () => {
    storeService.addWord(newWord);
    storeService.addWord(newWord);
    expect(storeService.getWords()).toEqual([newWord]);
  });

  it('should delete words', () => {
    storeService.addWord(newWord);
    storeService.addWord(newWord2);
    storeService.deleteWord(newWord);
    expect(storeService.getWords()).toEqual([newWord2]);
  });

  it('should change words number', () => {
    storeService.addWord(newWord);
    storeService.checkWordsNumber();
    expect(settingsServiceSpy.setSettings).toHaveBeenCalled();
  });
});
