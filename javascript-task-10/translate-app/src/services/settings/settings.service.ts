import { Injectable } from '@angular/core';
import { defaultSettings } from 'src/utils/const';
import { SettingsType } from 'src/utils/types';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settings: null | SettingsType;

  constructor() {
    const storageSettings = localStorage.getItem('settings');
    if (storageSettings) {
      this.settings = JSON.parse(storageSettings);
    } else {
      this.settings = defaultSettings;
    }
  }

  setSettings(setiings: SettingsType) {
    this.settings = setiings;
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  getSettings() {
    return this.settings;
  }
}
