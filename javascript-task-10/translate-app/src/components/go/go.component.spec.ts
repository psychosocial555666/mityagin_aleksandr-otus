import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { GoComponent } from './go.component';

const settings = {
  wordsNumber: 3,
  language: 'en|ru',
};

describe('GoComponent', () => {
  let component: GoComponent;
  let fixture: ComponentFixture<GoComponent>;
  let goComponent: GoComponent;

  const settingsServiceSpy = jasmine.createSpyObj('settingsService', [
    'getSettings',
  ]);
  const goServiseSpy = jasmine.createSpyObj('goService', [
    'reset',
    'checkAnswer',
    'goToNext',
  ]);

  const mockEvent = jasmine.createSpyObj('event', ['preventDefault']);

  settingsServiceSpy.getSettings.and.returnValue(settings);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [GoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    goComponent = new GoComponent(goServiseSpy, settingsServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset go service on init', () => {
    goComponent.ngOnInit();
    expect(goServiseSpy.reset).toHaveBeenCalled();
  });

  it('should create', () => {
    goComponent.onNextClick(mockEvent);
    expect(goServiseSpy.goToNext).toHaveBeenCalled();
    expect(goComponent.answer.value).toEqual('');
  });
});
