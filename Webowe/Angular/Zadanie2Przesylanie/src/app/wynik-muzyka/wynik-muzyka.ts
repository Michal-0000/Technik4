import { Component, Input, OnInit } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-wynik-muzyka',
  styleUrl: './wynik-muzyka.css',
  templateUrl: './wynik-muzyka.html',
})
export class WynikMuzyka implements OnInit{
  @Input() wynik! : string; 

  constructor(){};
  ngOnInit(): void {
    
  }
}
