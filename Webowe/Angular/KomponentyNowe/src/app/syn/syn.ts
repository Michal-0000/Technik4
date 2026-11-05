import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-syn',
  styleUrl: './syn.css',
  templateUrl: './syn.html',
})
export class Syn implements OnInit{

  @Input() doImportu!: string[];
  @Output() odpowiedz = new EventEmitter<string>();

  constructor(){}
  ngOnInit(): void {
    
  }

  wysylanie(){
    this.odpowiedz.emit("Przeczytaneee");
  }
}
