import { Injectable } from '@angular/core';
import {
  switchMap,
  of,
  catchError,
  map,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { StoreService } from '../store/store.service';

function unique(arr: string[]) {
  let result: string[] = [];

  for (let str of arr) {
    if (str && !result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  public isLoading = false;
  constructor(public storeService: StoreService) {}

  requestTranslation(word: string) {
    this.isLoading = true;

    fromFetch(
      `https://api.mymemory.translated.net/get?q=${word}&langpair=en|ru`
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
          data.matches.map((item: any) => item.translation.toLowerCase().match(/[а-я\s]/g)?.join(''))
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
