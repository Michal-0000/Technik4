import { TestBed } from '@angular/core/testing';
import { BMICalculatorService } from './bmicalculator-service';

describe('BMICalculatorService', () => {
  let service: BMICalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BMICalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
