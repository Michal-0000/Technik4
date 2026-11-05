import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Kolor } from './interfejsy';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  opcja:boolean = false;
  przelaczOpcje(){
    this.opcja = !this.opcja;
  }


  tekstWyjscie:string ='';
  sprawdzTekst(wartosc:string){
    if(wartosc == ''){
      this.tekstWyjscie='';
    }else if(/^-?\d+$/.test(wartosc)){
      this.tekstWyjscie='Numer';
    }else{
      this.tekstWyjscie='Tekst';
    }
  }

  kolor:Kolor = Kolor.R;
  zmienKolor(){
    switch (this.kolor){
      case Kolor.R:
        this.kolor = Kolor.G;
        return;
      case Kolor.G:
        this.kolor = Kolor.B;
        return;
      //deafult

    }
  }

}
