import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WynikMuzyka } from '../wynik-muzyka/wynik-muzyka';

@Component({
  imports: [CommonModule, FormsModule, WynikMuzyka],
  selector: 'app-wybor-muzyki',
  styleUrl: './wybor-muzyki.css',
  templateUrl: './wybor-muzyki.html',
})
export class WyborMuzyki {
  wyslanyRodzaj: string= '';
  wybranyRodzaj: string= '';

  rodzajeMuzyki:string[] = [
    'Rock',
    'Jazz',
    'Pop'
  ]

  wyslij(){
    this.wyslanyRodzaj = this.wybranyRodzaj;
  }
}
