import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-opcje-jezyka',
  styleUrl: './opcje-jezyka.css',
  templateUrl: './opcje-jezyka.html',
})
export class OpcjeJezyka implements OnInit {
ngOnInit(): void {
  
}
  
  @Output() wyslylka = new EventEmitter<string[]>();
  java:boolean = false;
  python:boolean = false;
  cpp:boolean = false;
  angular:boolean = false;

  wyslij(){
    this.wyslylka.emit(['wer', 'ewrrewr'])
  }
}
