using System.IO;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace GaleriaObrazow
{
    public partial class MainWindow : Window
    {
        private List<ImageItem> images;

        public MainWindow()
        {
            InitializeComponent();

            string imagesDirectory = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "images");
            string[] imageFiles = Directory.GetFiles(imagesDirectory, "*.jpg");
            List<string> imageDescriptions = File.ReadAllLines(System.IO.Path.Combine(imagesDirectory, "opisy.txt")).ToList();
            images = new List<ImageItem>();

            for (int i = 0; i < imageFiles.Length; i++)
            {
                images.Add(new ImageItem
                {
                    ImageSource = imageFiles[i],
                    Description = i < imageDescriptions.Count ? imageDescriptions[i] : "Brak opisu"
                });
                listViewImages.Items.Add(new { ImageSource = imageFiles[i]});
            }
            
        }

        private void listViewImages_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            int id = listViewImages.SelectedIndex;
            lblOpis.Content = images[id].Description;
            imgObraz.Source = new BitmapImage(new Uri(images[id].ImageSource));
        }

        private struct ImageItem
        {
            public string ImageSource { get; set; }
            public string Description { get; set; }
        }
    }
}