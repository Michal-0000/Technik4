import { NonNullAssert } from '@angular/compiler';
import { Service } from '@angular/core';

@Service()
export class Walidacja {
    imie(wartosc: string): string {
        if (!wartosc) {
            return 'Imię jest wymagane';
        }
        else if (wartosc.length < 2) {
            return 'Imię musi mieć co najmniej 2 znaki';
        }
        else if (wartosc.match(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/)) {
            return 'Imię może zawierać tylko litery';
        }
        return '';
    }

    nazwisko(wartosc: string): string {
        return this.imie(wartosc);
    }

    pesel(wartosc: string): string {
        if (!wartosc) {
            return 'PESEL jest wymagany';
        }
        else if (!wartosc.match(/^\d{11}$/)) {
            return 'PESEL musi składać się z 11 cyfr';
        }
        else if (!this.sprawdzPesel(wartosc)) {
            return 'Niepoprawny PESEL';
        }
        return '';
    }

    private sprawdzPesel(pesel: string): boolean {
        const cyfry = pesel.split('').map(Number);
        const wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
        let suma = 0;
        for (let i = 0; i < wagi.length; i++) {
            suma += cyfry[i] * wagi[i];
        }
        const kontrolna = (10 - (suma % 10)) % 10;
        if (kontrolna !== cyfry[10]) {
            return false;
        }

        let rok = cyfry[0] * 10 + cyfry[1];
        let miesiac = cyfry[2] * 10 + cyfry[3];
        let dzien = cyfry[4] * 10 + cyfry[5];

        if (miesiac > 80 && miesiac < 93) {
            rok += 1800;
            miesiac -= 80;
        } else if (miesiac > 0 && miesiac < 13) {
            rok += 1900;
        } else if (miesiac > 20 && miesiac < 33) {
            rok += 2000;
            miesiac -= 20;
        } else
            return false;

        const data = new Date(rok, miesiac - 1, dzien);
        if (data.getFullYear() !== rok || data.getMonth() + 1 !== miesiac || data.getDate() !== dzien) {
            return false;
        }

        return true;
    }

    dataUrodzenia(wartosc: string, dataUrodzenia: Date | null): string {
        if (!dataUrodzenia) return 'Brak podanego PESEL';
        if (!wartosc) {
            return 'Data urodzenia jest wymagana';
        }else if (dataUrodzenia > new Date()) {
            return 'Zbyt poźna data urodzenia';
        }else if (!wartosc.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return 'Niepoprawny format daty urodzenia';
        } else if (dataUrodzenia.getFullYear() !== parseInt(wartosc.substring(0, 4), 10) ||
            dataUrodzenia.getMonth() + 1 !== parseInt(wartosc.substring(5, 7), 10) ||
            dataUrodzenia.getDate() !== parseInt(wartosc.substring(8, 10), 10)) {
            return 'Data urodzenia niezgodna z PESEL';
        }
        return '';
    }

    obliczWiek(dataUrodzenia: Date): number {
        const dzisiaj = new Date();
        let wiek = dzisiaj.getFullYear() - dataUrodzenia.getFullYear();
        const m = dzisiaj.getMonth() - dataUrodzenia.getMonth();
        if (m < 0 || (m === 0 && dzisiaj.getDate() < dataUrodzenia.getDate())) {
            wiek--;
        }
        return wiek;
    }

    wiek(wartosc: string, dataUrodzenia: Date | null): string {
        if (!wartosc) {
            return 'Wiek jest wymagany';
        }
        const wiek = parseInt(wartosc, 10);
        if (isNaN(wiek) || wiek < 0) {
            return 'Niepoprawny wiek';
        } else if (!dataUrodzenia) {
            return 'Brak daty urodzenia';
        } else if (wiek !== this.obliczWiek(dataUrodzenia)) {
            return 'Wiek niezgodny z numerem PESEL';
        }
        return '';
    }

    plec(pesel: string): 'Mężczyzna' | 'Kobieta' {
        const cyfraPlec = parseInt(pesel.charAt(9), 10);
        return cyfraPlec % 2 === 0 ? 'Kobieta' : 'Mężczyzna';
    }
}
