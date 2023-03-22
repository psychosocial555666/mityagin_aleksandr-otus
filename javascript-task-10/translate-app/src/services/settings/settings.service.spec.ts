import { TestBed } from '@angular/core/testing';
import { SettingsService } from './settings.service';

const settings = {
  wordsNumber: 0,
  language: 'en|ru',
};

describe('SettingsService', () => {
  let service: SettingsService;
  let settingsService: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
    settingsService = new SettingsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get settings', () => {
    settingsService.setSettings(settings);
    expect(service.getSettings()?.wordsNumber).toBe(0);
    expect(service.getSettings()?.language).toBe('en|ru');
  });
});
