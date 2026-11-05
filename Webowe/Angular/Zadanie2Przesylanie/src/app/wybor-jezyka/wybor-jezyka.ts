import { Component } from '@angular/core';
import { OpcjeJezyka } from '../opcje-jezyka/opcje-jezyka';

@Component({
  imports: [OpcjeJezyka],
  selector: 'app-wybor-jezyka',
  styleUrl: './wybor-jezyka.css',
  templateUrl: './wybor-jezyka.html',
})
export class WyborJezyka {
  wybraneJezyki:string[] = [];
  onOdpowiedz(otrzymane:string[]){
    this.wybraneJezyki = otrzymane;
  }
}
