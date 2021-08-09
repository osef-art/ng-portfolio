import { TestBed } from '@angular/core/testing';

import { GithubRequestService } from './http-request.service';

describe('HttpRequestService', () => {
  let service: GithubRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
