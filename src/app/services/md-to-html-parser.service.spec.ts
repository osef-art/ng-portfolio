import { TestBed } from '@angular/core/testing';

import { MdToHtmlParserService } from './md-to-html-parser.service';

describe('MdToHtmlParserService', () => {
  let service: MdToHtmlParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdToHtmlParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
