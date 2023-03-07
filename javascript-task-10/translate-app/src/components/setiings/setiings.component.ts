import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-setiings',
  templateUrl: './setiings.component.html',
  styleUrls: ['./setiings.component.scss'],
})
export class SetiingsComponent {
  settingsForm;
  constructor(private formBuilder: FormBuilder) {
    this.settingsForm = formBuilder.group({
      wordsNumber: new FormControl(5, Validators.required),
      language: new FormControl("en|ru", Validators.required),
    });
  }
}
