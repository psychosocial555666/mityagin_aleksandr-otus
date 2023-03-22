import { TestBed } from '@angular/core/testing';

import { WordsService } from './words.service';

describe('WordsService', () => {
  let service: WordsService;
  let wordsService: WordsService;
  4;

  const translateServiceSpy = jasmine.createSpyObj('translateService', [
    'requestTranslation',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordsService);
    wordsService = new WordsService(translateServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should split phrase and request translation', () => {
    wordsService.splitPhrase('one two three');
    expect(translateServiceSpy.requestTranslation).toHaveBeenCalledTimes(3);
  });
});
