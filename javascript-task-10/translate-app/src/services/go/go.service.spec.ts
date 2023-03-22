import { TestBed } from '@angular/core/testing';

import { GoService } from './go.service';

const settings = {
  wordsNumber: 3,
  language: 'en|ru',
};

const words = [
  {
    word: 'word',
    translation: ['слово'],
  },
  {
    word: 'add',
    translation: ['добавить'],
  },
  {
    word: 'new',
    translation: ['новый'],
  },
];

describe('GoService', () => {
  let service: GoService;
  let goServise: GoService;
  const settingsServiceSpy = jasmine.createSpyObj('settingsService', [
    'getSettings',
  ]);
  const storeServiceeSpy = jasmine.createSpyObj('storeService', ['getWords']);
  settingsServiceSpy.getSettings.and.returnValue(settings);
  storeServiceeSpy.getWords.and.returnValue(words);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoService);

    goServise = new GoService(settingsServiceSpy, storeServiceeSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should current word to be null at beginning', () => {
    const currentWord = goServise.getCurrentWord();
    expect(currentWord).toBe(null);
  });

  it('should increase step', () => {
    goServise.setStep(2);
    goServise.increaseStep();

    expect(goServise.getStep()).toBe(3);
  });

  it('should increase step', () => {
    goServise.setStep(2);
    goServise.increaseStep();

    expect(goServise.getStep()).toBe(3);
  });

  it('should set random word', () => {
    goServise.getRandomWord();
    const currentWord = goServise.getCurrentWord();
    const expected =
      words.find((word) => word.word === currentWord?.word) || null;
    expect(currentWord).toBe(expected);
  });

  it('should check answer', () => {
    goServise.getRandomWord();
    const currentWord = goServise.getCurrentWord();
    goServise.checkAnswer(currentWord?.translation[0] as string);
    expect(goServise.isCorrect).toBe(true);
    goServise.checkAnswer('blablabla');
    expect(goServise.isCorrect).toBe(false);
  });

  it('should go to next step', () => {
    goServise.getRandomWord();
    const currentWord = goServise.getCurrentWord();
    goServise.goToNext();
    expect(goServise.isCorrect).toBe(false);
    expect(goServise.getStep()).toBe(2);
    expect(goServise.getCurrentWord()).not.toBe(currentWord);
  });

  it('should reset condition', () => {
    goServise.getRandomWord();
    const currentWord = goServise.getCurrentWord();
    goServise.goToNext();
    goServise.reset();
    expect(goServise.isFinished).toBe(false);
    expect(goServise.getStep()).toBe(1);
    expect(goServise.getCurrentWord()).toBeTruthy();
  });
});
