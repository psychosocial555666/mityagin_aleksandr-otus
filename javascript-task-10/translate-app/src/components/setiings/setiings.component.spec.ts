import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { SetiingsComponent } from './setiings.component';

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

describe('SetiingsComponent', () => {
  let component: SetiingsComponent;
  let fixture: ComponentFixture<SetiingsComponent>;
  let setiingsComponent: SetiingsComponent;

  const settingsServiceSpy = jasmine.createSpyObj('settingsService', [
    'getSettings',
  ]);

  const formBuilderSpy = jasmine.createSpyObj('formBuilder', ['group']);

  const storeServiceeSpy = jasmine.createSpyObj('storeService', [
    'getWords',
    'checkWordsNumber',
  ]);

  const mockEvent = jasmine.createSpyObj('event', ['preventDefault']);

  settingsServiceSpy.getSettings.and.returnValue(settings);
  storeServiceeSpy.getWords.and.returnValue(words);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
      declarations: [SetiingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SetiingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    setiingsComponent = new SetiingsComponent(
      formBuilderSpy,
      settingsServiceSpy,
      storeServiceeSpy
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call check words number on init', () => {
    setiingsComponent.ngOnInit();
    expect(storeServiceeSpy.checkWordsNumber).toHaveBeenCalled();
  });
});
