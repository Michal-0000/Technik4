using System.Text.RegularExpressions;

namespace MorseDrzewo
{
    public static class Program
    {
        public static readonly char[] morseTree = {
            ' ',
            'E', 'T',
            'I', 'A', 'N', 'M',
            'S', 'U', 'R', 'W', 'D', 'K', 'G', 'O',
            'H', 'V', 'F', ' ', 'L', ' ', 'P', 'J',
            'B', 'X', 'C', 'Y', 'Z', 'Q', ' ', ' '
        };
        public static void Main(string[] args)
        {
            string input = Console.ReadLine();
            Console.WriteLine(UnknownMorseToString(input));
        }

        public static char MorseToChar(string morse)
        {
            int index = 0;
            for(int i = 0; i < morse.Length && i < 4; i++)
            {
                if (morse[i] == '.')
                    index = 2 * index + 1;
                else if (morse[i] == '-')
                    index = 2 * index + 2;
                else
                    return ' ';
            }
            return morseTree[index];
        }

        public static string MorseToString(string morse)
        {
            if (!Regex.IsMatch(morse, @"^[.\-/\s]+$") || string.IsNullOrWhiteSpace(morse))
                return "Błędne dane";
            string[] letters = morse.Split(' ');
            string result = "";
            foreach(string letter in letters)
            {
                if (letter == "/")
                    result += ' ';
                else result += MorseToChar(letter);
            }
            return result;
        }

        public static string UnknownMorseToString(string morse)
        {
            morse = morse.Trim();

            if (!Regex.IsMatch(morse, @"^[.-]+$"))
                return "Błędne dane";

            return string.Join(", ", Read(morse));

            List<string> Read(string segment)
            {
                if (segment.Length == 0)
                    return new List<string> { "" };

                var results = new List<string>();

                for (int i = 0; i < segment.Length && i < 4; i++)
                {
                    char letter = MorseToChar(segment.Substring(0, i + 1));

                    foreach (string end in Read(segment.Substring(i + 1)))
                    {
                        results.Add(letter + end);
                    }
                }

                return results;
            }
        }
    }
}