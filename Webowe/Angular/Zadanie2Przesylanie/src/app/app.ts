import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WyborMuzyki } from './wybor-muzyki/wybor-muzyki';
import { WyborJezyka } from './wybor-jezyka/wybor-jezyka';

@Component({
  imports: [RouterOutlet, WyborMuzyki, WyborJezyka],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Zadanie2Przesylanie');
}
