import { Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BMICalculatorService } from './bmicalculator-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  providers: [BMICalculatorService]
})
export class App {
  
  height: number = 0;
  weight: number = 0;
  bmi: number | null = null;

  constructor(private bmiCalculator: BMICalculatorService) {}

  calculate():void{
    try{
      this.bmi = this.bmiCalculator.calculateBMI(this.weight, this.height);
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
