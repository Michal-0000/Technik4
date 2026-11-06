import { Component } from '@angular/core';
import { KalkulatorService } from './kalkulator-service';
import { Kalk } from './kalk/kalk';

@Component({
  imports: [Kalk],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  
  dodawanie: number = 0;

  constructor(kalkulator: KalkulatorService){
    this.dodawanie = kalkulator.dodaj(3,2,4,1,4);
  }
}
