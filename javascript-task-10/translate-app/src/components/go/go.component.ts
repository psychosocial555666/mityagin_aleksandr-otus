import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { GoService } from 'src/services/go/go.service';
import { SettingsService } from 'src/services/settings/settings.service';

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.scss'],
})
export class GoComponent implements OnInit {
  public answer: FormControl;

  constructor(
    public goService: GoService,
    public settingsService: SettingsService
  ) {
    this.answer = new FormControl('');
  }

  ngOnInit() {
    this.goService.reset();
    this.answer.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((query: string) => {
        this.goService.checkAnswer(query.toLowerCase());
      });
  }

  onNextClick(event: MouseEvent) {
    event.preventDefault();
    this.answer.setValue('');
    this.goService.goToNext();
  }
}
