import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { StoreService } from 'src/services/store/store.service';

@Injectable()
export default class ActivateGuard implements CanActivate {
  constructor(private storeService: StoreService) {}

  canActivate() {
    return !!this.storeService.getWords().length;
  }
}
