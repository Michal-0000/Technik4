using System.Runtime.CompilerServices;

namespace Egz1Fibonacci
{
    public static class Program
    {
        private static List<int> data = new List<int>();
        private static string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "dane.txt");
        private static string pathResult = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wyniki_konsola.txt");
        public static void Main(string[] args)
        {
            ReadFile(path);
            for (int i = 1; i <= data.Count; i++)
            {
                Console.WriteLine($"{i}: {fib(i)} ");
            }
            for (int i = 0;i < data.Count; i++)
            {
                string prime = is_prime(data[i]) ? "Pierwsza" : "Niepierwsza";
                Console.WriteLine($"{data[i]} - {prime}");
            }

            try
            {
                using (StreamWriter sw = new StreamWriter(pathResult))
                {
                    for (int i = 1; i <= data.Count; i++)
                    {
                        sw.WriteLine($"{i}: {fib(i)} ");
                    }

                    sw.WriteLine("Sprawdzenie liczb pierwszych.");
                    for (int i = 0; i < data.Count; i++)
                    {
                        string prime = is_prime(data[i]) ? "Pierwsza" : "Niepierwsza";
                        sw.WriteLine($"{data[i]} - {prime}");
                    }
                    sw.Close();
                }
                Console.WriteLine("Zapisano");
            }
            catch(Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            
        }

        private static void ReadFile(string path)
        {
            if (!File.Exists(path))
            {
                Console.WriteLine("Brak pliku: " + path);
                return;
            }
            data.Clear();
            try
            {
                string[] fileData = File.ReadAllLines(path);
                for (int i = 0; i < fileData.Length; i++)
                {
                    if (int.TryParse(fileData[i], out int n))
                        data.Add(n);
                    else
                    {
                        Console.WriteLine($"{fileData[i]}: nie jest liczbą.");
                        continue;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        private static decimal fib(int n)
        {
            long a = 1, b = 1, c = 1;
            for (int i = 3; i <= n; i++)
            {
                c = a + b;
                a = b;
                b = c;
            }
            return (n <= 2) ? 1 : c;
        }

        private static bool is_prime(int x)
        {
            if (x <= 1) return false;
            if (x == 2) return true;
            if (x % 2 == 0) return false;
            for(int i = 3; i <= Math.Ceiling(Math.Sqrt(x)); i++)
            {
                if (x % i == 0) return false;
            }
            return true;
        }
    }
}