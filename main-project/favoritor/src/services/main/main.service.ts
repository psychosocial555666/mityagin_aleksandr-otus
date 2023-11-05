import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public search: string = '';
  constructor() { }

  setSearch(search: string) {
    this.search = search.trim();
  }
}
