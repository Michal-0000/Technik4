import { Service } from '@angular/core';

@Service()
export class BMICalculatorService {
    calculateBMI(weight: number, height: number): number {
        height = height / 100;
        if (height <= 0) {
            throw new Error("Wysokosc musi byc wieksza od zera.");
        }
        return weight / (height * height);
    }
}
