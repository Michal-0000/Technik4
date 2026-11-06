import { TestBed } from '@angular/core/testing';
import { Walidacja } from './walidacja';

describe('Walidacja', () => {
  let service: Walidacja;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Walidacja);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
