import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Formularz } from './formularz/formularz';
import { Zarejestrowani } from './zarejestrowani/zarejestrowani';


@Component({
  imports: [RouterOutlet, Formularz, Zarejestrowani],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('rejestracja');
}
