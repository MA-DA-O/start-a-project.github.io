import { TestBed } from '@angular/core/testing';

import { RequiredParametersService } from './required-parameters.service';

describe('RequiredParametersService', () => {
  let service: RequiredParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequiredParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
