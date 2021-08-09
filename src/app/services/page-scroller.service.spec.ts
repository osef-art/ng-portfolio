import { TestBed } from '@angular/core/testing';

import { PageScrollerService } from './page-scroller.service';

describe('PageScrollerService', () => {
  let service: PageScrollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageScrollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
