using System.Text;
using System.Text.RegularExpressions;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using static System.Net.Mime.MediaTypeNames;

namespace AlfabetMorsa
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public static readonly Dictionary<char, string> MorseDictionary = new Dictionary<char, string>
    {
        // Litery podstawowe
        { 'A', ".-" },
        { 'B', "-..." },
        { 'C', "-.-." },
        { 'D', "-.." },
        { 'E', "." },
        { 'F', "..-." },
        { 'G', "--." },
        { 'H', "...." },
        { 'I', ".." },
        { 'J', ".---" },
        { 'K', "-.-" },
        { 'L', ".-.." },
        { 'M', "--" },
        { 'N', "-." },
        { 'O', "---" },
        { 'P', ".--." },
        { 'Q', "--.-" },
        { 'R', ".-." },
        { 'S', "..." },
        { 'T', "-" },
        { 'U', "..-" },
        { 'V', "...-" },
        { 'W', ".--" },
        { 'X', "-..-" },
        { 'Y', "-.--" },
        { 'Z', "--.." },

        // Polskie znaki diakrytyczne
        { 'Ą', ".-.-" },
        { 'Ć', "-.-.." },
        { 'Ę', "..-.." },
        { 'Ł', ".-..-" },
        { 'Ń', "--.--" },
        { 'Ó', "---." },
        { 'Ś', "...-..." },
        { 'Ź', "--..-." },
        { 'Ż', "--..-" },

        // Cyfry
        { '1', ".----" },
        { '2', "..---" },
        { '3', "...--" },
        { '4', "....-" },
        { '5', "....." },
        { '6', "-...." },
        { '7', "--..." },
        { '8', "---.." },
        { '9', "----." },
        { '0', "-----" },

        // Separator słów
        { ' ', "/" }
    };
        public static readonly Dictionary<string, char> FromMorseDictionary = MorseDictionary.ToDictionary(pair =>  pair.Value, pair => pair.Key);

        public MainWindow()
        {
            InitializeComponent();
        }

        private void txtMorse_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (!txtMorse.IsFocused) return;
            string morseText = txtMorse.Text.Trim();
            if (Regex.IsMatch(morseText, @"^[.\-\s/]+$"))
            {
                string[] splitted = morseText.Split(' ');
                string result = "";
                foreach (string s in splitted)
                {
                    if(FromMorseDictionary.TryGetValue(s, out char value))
                    {
                        result += value;
                    }
                }
                txtNormal.Text = result;
            }
        }

        private void txtNormal_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (!txtNormal.IsFocused) return;
            string text = txtNormal.Text.Trim().ToUpper();
            if(Regex.IsMatch(text, @"^[A-ZĄĆĘŁŃÓŚŹŻ\s0-9]+$"))
            {
                string morseResult = "";
                for (int i = 0; i < text.Length; i++)
                {
                    morseResult += MorseDictionary[text[i]] + ' ';
                }
                txtMorse.Text = morseResult;
            }
        }
    }
}