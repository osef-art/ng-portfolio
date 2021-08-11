import { TestBed } from '@angular/core/testing';

import { CustomParserService } from './custom-parser.service';

describe('MdToHtmlParserService', () => {
  let service: CustomParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
