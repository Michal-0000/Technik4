import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Walidacja } from '../walidacja';
import { Osoba } from '../osobaInterfejs';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-formularz',
  styleUrl: './formularz.css',
  templateUrl: './formularz.html',
})  
export class Formularz {
  zarejestrujWynik: string = '';

  imieError: string = '';
  nazwiskoError: string = '';
  peselError: string = '';
  dataUrodzeniaError: string = '';
  wiekError: string = '';

  imie: string = '';
  nazwisko: string = ''
  pesel: string = '';
  dataUrodzenia: Date | null = null;
  peselInput: string = '';
  dataUrodzeniaInput: string = '';
  wiekInput: string = '';
  Wiek: number | null = null;

  @Input() osoby: Osoba[] = [];
  @Output() osobaZarejestrowana = new EventEmitter<Osoba>();
  constructor(private walidacja: Walidacja) {}

  OnImieChange(wartosc: string): void {
    this.imieError = this.walidacja.imie(wartosc);
    if (this.imieError === '') {
      this.imie = wartosc;
    }
  }

  OnNazwiskoChange(wartosc: string): void {
    this.nazwiskoError = this.walidacja.nazwisko(wartosc);
    if (this.nazwiskoError === '') {
      this.nazwisko = wartosc;
    }
  }

  OnPeselChange(wartosc: string): void {
    this.peselError = this.walidacja.pesel(wartosc);
    if (this.peselError === '') {
      this.pesel = wartosc;
      this.dataUrodzenia = new Date(
        parseInt(wartosc.substring(0, 2), 10) +
          (parseInt(wartosc.substring(2, 4), 10) > 20
            ? 2000
            : parseInt(wartosc.substring(2, 4), 10) > 0
            ? 1900
            : 1800),
        parseInt(wartosc.substring(2, 4), 10) % 20 - 1,
        parseInt(wartosc.substring(4, 6), 10)
      ); 
    }
  }

  OnDataUrodzeniaChange(wartosc: string): void {
    this.dataUrodzeniaError = this.walidacja.dataUrodzenia(wartosc, this.dataUrodzenia);
  }

  OnWiekChange(wartosc: string): void {
    const wiek = parseInt(wartosc, 10);
    this.wiekError = this.walidacja.wiek(wartosc,this.dataUrodzenia);
    if (this.wiekError === '') {
      this.Wiek = wiek;
    }
  }

  SprawdzWszystko(): boolean {
    this.OnImieChange(this.imie);
    this.OnNazwiskoChange(this.nazwisko);
    this.OnPeselChange(this.peselInput);
    this.OnDataUrodzeniaChange(this.dataUrodzeniaInput);
    this.OnWiekChange(this.wiekInput);
    return !this.imieError && !this.nazwiskoError && !this.peselError && !this.dataUrodzeniaError && !this.wiekError;
  }

  OnZarejestrujClick(): void {
    if(this.osoby.some(o => o.pesel === this.pesel)) {
      this.zarejestrujWynik = 'Ten PESEL jest już zarejestrowany';
    } else if (
      this.SprawdzWszystko()
    ) {
      const osoba: Osoba = {
        imie: this.imie,
        nazwisko: this.nazwisko,
        pesel: this.pesel,
        dataUrodzenia: this.dataUrodzenia!,
        wiek: this.Wiek!,
        plec: this.walidacja.plec(this.pesel)
      };
      this.osobaZarejestrowana.emit(osoba);
      this.zarejestrujWynik = 'Zarejestrowano: ' + osoba.imie + ' ' + osoba.nazwisko;
    } else{
      this.zarejestrujWynik = 'Niepoprawne dane';
    }
  }
}
