export interface Osoba {
    imie: string;
    nazwisko: string;
    pesel: string;
    dataUrodzenia: Date;
    wiek: number;
    plec: 'Mężczyzna' | 'Kobieta';
}