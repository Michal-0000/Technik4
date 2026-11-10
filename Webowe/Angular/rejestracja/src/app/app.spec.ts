import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { App } from './app';
import { Formularz } from './formularz/formularz';
import { Osoba } from './osobaInterfejs';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, rejestracja');
  });

  it('adds a registered person to the list', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const formularz = fixture.debugElement.query(By.directive(Formularz)).componentInstance as Formularz;
    const osoba: Osoba = {
      imie: 'Anna',
      nazwisko: 'Testowa',
      pesel: '00210112345',
      dataUrodzenia: new Date(2000, 0, 1),
      wiek: 26,
      plec: 'Kobieta',
    };

    formularz.osobaZarejestrowana.emit(osoba);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(1);
    expect(fixture.nativeElement.querySelector('tbody')?.textContent).toContain('Anna');
  });
});
