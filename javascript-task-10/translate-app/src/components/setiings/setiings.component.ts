import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'src/services/settings/settings.service';
import { StoreService } from 'src/services/store/store.service';

@Component({
  selector: 'app-setiings',
  templateUrl: './setiings.component.html',
  styleUrls: ['./setiings.component.scss'],
})
export class SetiingsComponent implements OnInit {
  settingsForm;
  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private storeService: StoreService
  ) {
    this.settingsForm = this.formBuilder.group({
      wordsNumber: new FormControl(settingsService.getSettings()?.wordsNumber, [
        Validators.min(1),
        Validators.max(this.storeService.getWords().length),
        Validators.pattern('[0-9]*'),
        Validators.required,
      ]),
      language: new FormControl(
        settingsService.getSettings()?.language,
        Validators.required
      ),
    });
  }
  ngOnInit(): void {
    this.storeService.checkWordsNumber();
  }

  increaseValue(event: MouseEvent) {
    event.preventDefault();
    const current = this.settingsForm.value.wordsNumber;
    if (current) {
      this.settingsForm.patchValue({
        wordsNumber: +current + 1,
      });
    } else {
      this.settingsForm.patchValue({
        wordsNumber: 1,
      });
    }
  }

  decreaseValue(event: MouseEvent) {
    event.preventDefault();
    const current = this.settingsForm.value.wordsNumber;
    if (current) {
      this.settingsForm.patchValue({
        wordsNumber: +current - 1,
      });
    }
  }

  onSubmit() {
    if (this.settingsForm.value && this.settingsForm.valid) {
      this.settingsService.setSettings(this.settingsForm.value);
    }
  }
}
