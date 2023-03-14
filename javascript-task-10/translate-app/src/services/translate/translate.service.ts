import { Injectable } from '@angular/core';
import { switchMap, of, catchError, map } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { RegFilterExp } from 'src/utils/const';
import { unique } from 'src/utils/methods';
import { SettingsService } from '../settings/settings.service';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  public isLoading = false;
  constructor(
    private storeService: StoreService,
    private settingsService: SettingsService
  ) {}

  requestTranslation(word: string) {
    this.isLoading = true;
    const reg =
      this.settingsService.getSettings()?.language === 'en|ru'
        ? RegFilterExp.RUSSIAN
        : RegFilterExp.ENGLISH;

    fromFetch(
      `https://api.mymemory.translated.net/get?q=${word}&langpair=${
        this.settingsService.getSettings()?.language
      }`
    )
      .pipe(
        switchMap((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return of({ error: true, message: `Error ${response.status}` });
          }
        }),
        map((data) =>
          data.matches.map((item: any) =>
            item.translation.toLowerCase().match(reg)?.join('')
          )
        ),
        catchError((err) => {
          console.error(err);
          this.isLoading = false;
          return of({ error: true, message: err.message });
        })
      )
      .subscribe((result: string[]) => {
        this.storeService.addWord({ word: word, translation: unique(result) });
        this.isLoading = false;
      });
  }
}
