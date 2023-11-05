import { TestBed } from '@angular/core/testing';

import { SidebarModalService } from './sidebar-modal.service';

describe('SidebarModalService', () => {
  let service: SidebarModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
