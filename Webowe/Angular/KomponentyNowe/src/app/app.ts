import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Syn } from './syn/syn';
import { Wnuk } from './wnuk/wnuk';
import { Corka } from './corka/corka';

@Component({
  imports: [RouterOutlet, Syn, Corka, Wnuk],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('KomponentyNowe');

  doEksportu: string[] =['8:00', 'Szkola'];

  onOdpowiedz(otrzymane: string){
    alert(otrzymane);
  }
}
