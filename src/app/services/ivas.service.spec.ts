import { TestBed } from '@angular/core/testing';

import { IvasService } from './ivas.service';

describe('IvasService', () => {
  let service: IvasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IvasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
