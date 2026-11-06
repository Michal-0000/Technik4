import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KalkulatorService } from '../kalkulator-service';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-kalk',
  styleUrl: './kalk.css',
  templateUrl: './kalk.html',
  providers: [KalkulatorService]
})
export class Kalk {
  num1: number = 0;
  num2: number = 0;
  result: { sum: number, difference: number, product: number, quotient: number } | null = null;
  errorMessage: string | null = null;

  constructor(private kalkulator: KalkulatorService) {}

  calculate(): void {
    try {
      this.errorMessage = null;

      this.result = {
        sum: this.kalkulator.add(this.num1, this.num2),
        difference: this.kalkulator.subtract(this.num1, this.num2),
        product: this.kalkulator.multiply(this.num1, this.num2),
        quotient: this.kalkulator.divide(this.num1, this.num2),
      };
    } catch (error: any) {
      this.errorMessage = error.message;
      this.result = null;
    }
  }
}
