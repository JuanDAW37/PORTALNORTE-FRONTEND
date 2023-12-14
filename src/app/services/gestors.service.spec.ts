import { TestBed } from '@angular/core/testing';

import { GestorsService } from './gestors.service';

describe('GestorsService', () => {
  let service: GestorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
