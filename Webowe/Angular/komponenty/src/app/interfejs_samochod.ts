export interface Samochod{
    marka: string;
    model: string;
    zdjecie: string;
    dane: string[];
    type: Rodzaj;
}

export enum Rodzaj{
    sportowy = 1,
    suv,
    cabrio
}