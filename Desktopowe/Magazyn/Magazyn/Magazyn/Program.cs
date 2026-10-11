using System.Globalization;

namespace Magazyn
{
    public static class Program
    {
        private static string filePath = Path.Combine(AppContext.BaseDirectory, "produkty.txt");
        public static void Main(string[] args)
        {
            Magazyn magazyn = new Magazyn();
            magazyn.wczytaj_produkty(filePath);
            magazyn.wyswietl_magazyn();
        }
    }

    public class Magazyn
    {
        private List<Produkt> produkty = new List<Produkt>();

        public void wczytaj_produkty(string filePath)
        {
            produkty.Clear();
            if (!File.Exists(filePath))
            {
                Console.WriteLine($"Plik {filePath} nie istnieje.");
                return;
            }
            string[] linie = File.ReadAllLines(filePath);
            foreach(string linia in linie)
            {
                string[] dane = linia.Split(',');
                if (float.TryParse(dane[1], CultureInfo.InvariantCulture, out float cena_netto) && int.TryParse(dane[2], out int ilosc))
                {
                    Produkt produkt = new Produkt(dane[0], cena_netto, ilosc);
                    produkty.Add(produkt);
                }
                else
                {
                    Console.WriteLine($"Nieprawidłowe dane w linii: {linia}");
                    continue;
                }
            }
        }

        public float oblicz_laczna_wartosc_magazynu_brutto()
        {
            float laczna_wartosc = 0f;
            foreach (Produkt produkt in produkty)
            {
                laczna_wartosc += produkt.oblicz_wartosc_magazynu_brutto();
            }
            return laczna_wartosc;
        }

        public void wyswietl_magazyn()
        {
            foreach (Produkt produkt in produkty)
            {
                produkt.wyswietl_opis();
            }
            Console.WriteLine($"\nŁĄCZNA WARTOŚĆ CAŁEGO MAGAZYNU (BRUTTO): {oblicz_laczna_wartosc_magazynu_brutto().ToString("F2", CultureInfo.InvariantCulture)} PLN");
        }
    }

    public class Produkt
    {
        public string nazwa;
        public float cena_netto;
        public int ilosc;

        public Produkt(string nazwa, float cena_netto, int ilosc)
        {
            this.nazwa = nazwa;
            this.cena_netto = cena_netto;
            this.ilosc = ilosc;
        }

        public float oblicz_wartosc_brutto(float vat = 23f)
        {
            return cena_netto * (100f + vat) / 100f;
        }

        public float oblicz_wartosc_magazynu_brutto()
        {
            return oblicz_wartosc_brutto() * ilosc;
        }

        public void wyswietl_opis()
        {
            Console.WriteLine(
                $"-------------------------------------\n" +
                $"Produkt: {nazwa}\n" +
                $"Ilość na stanie: {ilosc} szt.\n" +
                $"Cena netto: {cena_netto.ToString("F2", CultureInfo.InvariantCulture)} PLN | Cena brutto: {oblicz_wartosc_brutto().ToString("F2", CultureInfo.InvariantCulture)} PLN\n" +
                $"Łączna wartość w magazynie (brutto): {oblicz_wartosc_magazynu_brutto().ToString("F2", CultureInfo.InvariantCulture)} PLN\n" + // FORMATOWANI 
                "--------------------------------------"
                );
        }
    }
}