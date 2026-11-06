import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KalkulatorService {

   dodaj(...liczby: number[]):number{
    let wynik = 0;
    for(let liczba of liczby){
        wynik +=liczba;
    }
    return wynik;
   }

   subtract(a:number, b:number):number{
    return a-b
   }
   add(a:number, b:number):number{
    return a+b
   }
   multiply(a:number, b:number):number{
    return a*b
   }
   divide(a:number, b:number):number{
    if(b===0){
        throw Error("Cannot divide by 0");
    }
    return a/b;
   }
}
