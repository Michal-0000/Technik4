import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Osoba } from '../osobaInterfejs';
import { Input } from '@angular/core';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-zarejestrowani',
  styleUrl: './zarejestrowani.css',
  templateUrl: './zarejestrowani.html',
})
export class Zarejestrowani {
  @Input() osoby: Osoba[] = [];
}
