import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Samochod, Rodzaj } from './interfejs_samochod';

@Component({
  imports: [RouterOutlet, FormsModule, CommonModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  samochody: Samochod[] = [
    {
      marka: 'Ferrari',
      model: 'California',
      zdjecie: 'ferrari_california.jpg',
      dane: ['do setki 3,2s', 'cena 0.5mln euro'],
      type: Rodzaj.sportowy,
    },
    {
      marka: 'BMW',
      model: 'X5',
      zdjecie: 'bmw_x5.jpg',
      dane: ['do setki 11s', 'cena 100 000 euro'],
      type: Rodzaj.suv,
    },
    {
      marka: 'Mercedes',
      model: 'CLS',
      zdjecie: 'mercedes_cls.jpg',
      dane: ['do setki 3,8s', 'cena 0.4mln euro'],
      type: Rodzaj.cabrio,
    }
  ];

  samochod:Samochod = this.samochody[0];
  kolorb:string = 'white';
  kolort:string = 'black';
  aktywna:boolean = true;
  pokazZdjecie:boolean = false;

  zmienKolor(){
    this.kolorb = this.kolorb === 'white' ? 'black' : 'white';
    this.kolort = this.kolort === 'black' ? 'white' : 'black';
  }

  Rodzaj = Rodzaj;

  constructor() {}
}