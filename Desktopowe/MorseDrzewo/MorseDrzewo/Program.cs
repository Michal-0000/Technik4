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
            if (string.IsNullOrWhiteSpace(morse))
                return "";
            if (!Regex.IsMatch(morse, @"^[.\-/]+$"))
                return "Błędne dane";

            string result = "";
            for (int i = 0; i < morse.Length && i < 4; i++)
            {
                result += MorseToChar(morse.Substring(0, i+1));
                if(i < morse.Length)
                {
                    result += UnknownMorseToString(morse.Substring(i+1));
                }
                if(i < morse.Length - 1)
                {
                    result += ", ";
                }
            }
            if(morse.Length > 4)
            {
                result += UnknownMorseToString(morse.Substring(4));
            }
            return result;
            
        }
    }
}