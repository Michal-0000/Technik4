using System.Linq;

namespace wew11
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            Losowanie losowanie;
            int min, max, ile;
            Console.WriteLine("KLUB GIER PLANSZOWYCH - losowanie na turniej");

            while (true)
            {
                Console.Write("Najmniejszy numer: ");
                if (!int.TryParse(Console.ReadLine(), out min))
                {
                    Console.WriteLine("Błąd: podaj liczbę całkowitą.");
                    continue;
                }

                Console.Write("Największy numer: ");
                if (!int.TryParse(Console.ReadLine(), out max))
                {
                    Console.WriteLine("Błąd: podaj liczbę całkowitą.");
                    continue;
                }
                else if (max <= min) {
                    Console.WriteLine("Błąd: najmniejszy numer musi być mniejszy od największego.");
                    continue;
                }
                break;
            }
            losowanie = new Losowanie(min, max);
            while (true){
                Console.Write("Ilość losowań: ");
                if (!int.TryParse(Console.ReadLine(), out ile))
                {
                    Console.WriteLine("Błąd: podaj liczbę całkowitą.");
                    continue;
                }
                else if (ile < 1)
                {
                    Console.WriteLine("Błąd: liczba losowań musi być większa od zera.");
                    continue;
                }
                break;
            }

            LosujZPowtorzeniem(losowanie, ile);
            LosujBezPowtorzen(losowanie, ile);
        }

        public static void LosujZPowtorzeniem(Losowanie losowanie, int ile)
        {
            List<int> lista = losowanie.ZPowtorzeniami(ile);
            Dictionary<int, int> dict = Losowanie.PoliczWystapienia(lista);
            Console.WriteLine($"Numery stołów (z powtórzeniami): {string.Join(", ", lista)}");
            Console.WriteLine("Liczba graczy przy stołach:");
            foreach (var kvp in dict)
            {
                Console.WriteLine($"Stół {kvp.Key}: {kvp.Value}");
            }
        }

        public static void LosujBezPowtorzen(Losowanie losowanie, int ile)
        {
            List<int> lista;
            try
            {
                lista = losowanie.BezPowtorzen(ile); 
            } catch(ArgumentOutOfRangeException)
            {
                Console.WriteLine($"Błąd: Nie można wylosować {ile} różnych liczb z zakresu {losowanie.minimum}-{losowanie.maximum}");
                return;
            }
            List<int> posortowana = Losowanie.Posortuj(lista);

            Console.WriteLine($"Numery stołów (bez powtórzeń): {string.Join(", ", lista)}");
            Console.WriteLine($"Numery startowe rosnąco: {string.Join(", ", posortowana)}");
        }
    }

    public class Losowanie
    {
        public int minimum { get; set; }
        public int maximum { get; set; }
        public Losowanie(int minimum, int maximum)
        {
            if (maximum <= minimum)
                throw new ArgumentException();
            this.minimum = minimum;
            this.maximum = maximum;
        }
        public List<int> ZPowtorzeniami(int ile)
        {
            Random rand = new Random();
            List<int> list = new List<int>(ile);
            for (int i = 0; i < ile; i++)
            {
                list.Add(rand.Next(minimum, maximum + 1));
            }
            return list;
        }

        public List<int> BezPowtorzen(int ile)
        {
            if (ile > maximum - minimum + 1)
                throw new ArgumentOutOfRangeException();

            Random rand = new Random();
            List<int> list = new List<int>(ile);
            for (int i = 0; i < ile; i++)
            {
                int number;
                do
                    number = rand.Next(minimum, minimum + 1);
                while (list.Contains(number));
                list.Add(number);
            }
            return list;
        }

        public static Dictionary<int, int> PoliczWystapienia(List<int> liczby)
        {
            Dictionary<int, int> dict = new Dictionary<int, int>();
            for (int i = 0; i < liczby.Count; i++)
            {
                if (dict.TryGetValue(liczby[i], out int count))
                    dict[i] = ++count;
                else
                    dict[i] = 1;
            }
            return dict;
        }

        public static List<int> Posortuj(List<int> liczby)
        {
            List<int> list = new List<int>(liczby);

            int n = list.Count;
            for (int i = 0; i < n - 1; i++)
            {
                bool changed = false;
                for (int j = 0; j < n - 1 - i; j++)
                {
                    if (list[j] > list[i])
                    {
                        changed = true;
                        (list[i], list[j]) = (list[j], list[i]);
                    }       
                }
                if (!changed) break;
            }
            return list;
        }
    }
}