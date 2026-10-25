using System.Numerics;
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

namespace Planer
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private const double elementOverlapThreshold = 0.01;
        private const double resizeGripSize = 10.0;
        private Shape? draggedItem = null;
        private Vector2 lastItemPosition = Vector2.Zero;
        private Vector2 lastItemSize = Vector2.Zero;
        private bool isResizing = false;
        private Vector2 dragOffset = Vector2.Zero;



        public MainWindow()
        {
            InitializeComponent();
        }

        private bool isOverlapping(UIElement element, UIElement newElement, Vector2 newPos, bool isRotated = false)
        {
            double left1 = Canvas.GetLeft(element);
            double top1 = Canvas.GetTop(element);

            Rect rect1 = new Rect(
                left1 + elementOverlapThreshold,
                top1 + elementOverlapThreshold,
                element.RenderSize.Width - 2 * elementOverlapThreshold,
                element.RenderSize.Height - 2 * elementOverlapThreshold
            );

            Rect rect2 = new Rect(
                newPos.X + elementOverlapThreshold,
                newPos.Y + elementOverlapThreshold,
                isRotated ? newElement.RenderSize.Height - 2 * elementOverlapThreshold :
                    newElement.RenderSize.Width - 2 * elementOverlapThreshold,
                isRotated ? newElement.RenderSize.Width - 2 * elementOverlapThreshold :
                    newElement.RenderSize.Height - 2 * elementOverlapThreshold
            );

            return rect1.IntersectsWith(rect2);
        }

        private bool isOverlappingAny(UIElement element, Vector2 newPos, bool isRotated = false)
        {
            foreach (UIElement child in canvasRoom.Children)
            {
                if (child == element)
                    continue;
                if (isOverlapping(child, element, newPos, isRotated))
                    return true;
            }
            return false;
        }

        private bool isInsideCanvas(double Left, double top, double width, double height)
        {
            double right = Left + width;
            double bottom = top + height;
            return Left >= 0 && top >= 0 && right <= canvasRoom.ActualWidth && bottom <= canvasRoom.ActualHeight;
        }

        private void btnAddTable_Click(object sender, RoutedEventArgs e)
        {
            Rectangle table = new Rectangle
            {
                Width = 100,
                Height = 60,
                Fill = Brushes.Brown,
                Stroke = Brushes.Black,
                StrokeThickness = 2
            };
            Canvas.SetLeft(table, 0);
            Canvas.SetTop(table, 0);
            canvasRoom.Children.Add(table);
        }

        private void btnAddBed_Click(object sender, RoutedEventArgs e)
        {
            Rectangle bed = new Rectangle
            {
                Width = 60,
                Height = 120,
                Fill = Brushes.Blue,
                Stroke = Brushes.Black,
                StrokeThickness = 2
            };
            Canvas.SetLeft(bed, 0);
            Canvas.SetTop(bed, 0);
            canvasRoom.Children.Add(bed);
        }

        private void canvasRoom_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (e.OriginalSource is not Shape shape) return;

            draggedItem = shape;
            dragOffset = new Vector2(
                (float)e.GetPosition(canvasRoom).X - (float)Canvas.GetLeft(shape),
                (float)e.GetPosition(canvasRoom).Y - (float)Canvas.GetTop(shape)
            );
            lastItemPosition = new Vector2((float)Canvas.GetLeft(shape), (float)Canvas.GetTop(shape));

            if (dragOffset.Y > shape.ActualHeight - resizeGripSize && dragOffset.X > shape.ActualWidth - resizeGripSize)
            {
                isResizing = true;
                lastItemSize = new Vector2((float)shape.Width, (float)shape.Height);
                canvasRoom.Cursor = Cursors.SizeNWSE;
                shape.CaptureMouse();
                return;
            }
            
            canvasRoom.Cursor = Cursors.SizeAll;
            shape.CaptureMouse();
        }

        private void canvasRoom_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            if (draggedItem == null) return;

            Vector2 newPos = new Vector2((float)Canvas.GetLeft(draggedItem), (float)Canvas.GetTop(draggedItem));
            if (isOverlappingAny(draggedItem, newPos) || !isInsideCanvas(newPos.X, newPos.Y, draggedItem.ActualWidth, draggedItem.ActualHeight))
            {
                if (isResizing)
                {
                    draggedItem.Width = lastItemSize.X;
                    draggedItem.Height = lastItemSize.Y;
                }

                Canvas.SetLeft(draggedItem, lastItemPosition.X);
                Canvas.SetTop(draggedItem, lastItemPosition.Y);
            }
            if (isResizing)
                isResizing = false;
            draggedItem.ReleaseMouseCapture();
            draggedItem = null;
            canvasRoom.Cursor = Cursors.Arrow;

        }

        private void canvasRoom_MouseMove(object sender, MouseEventArgs e)
        {
            if (draggedItem == null || e.LeftButton != MouseButtonState.Pressed)
                return;

            Point currentPos = e.GetPosition(canvasRoom);

            if (isResizing)
            {
                double newWidth = Math.Max(20, Math.Round((currentPos.X - Canvas.GetLeft(draggedItem)) / 20) * 20);
                double newHeight = Math.Max(20, Math.Round((currentPos.Y - Canvas.GetTop(draggedItem)) / 20) * 20);
                draggedItem.Width = newWidth;
                draggedItem.Height = newHeight;
                if (!isInsideCanvas(Canvas.GetLeft(draggedItem), Canvas.GetTop(draggedItem), newWidth, newHeight)) return;
                return;
            }

            double newLeft = Math.Round((currentPos.X - dragOffset.X) / 20) * 20;
            double newTop = Math.Round((currentPos.Y - dragOffset.Y) / 20) * 20;

            if(!isInsideCanvas(newLeft, newTop, draggedItem.ActualWidth, draggedItem.ActualHeight)) return;

            Canvas.SetLeft(draggedItem, newLeft);
            Canvas.SetTop(draggedItem, newTop);
        }

        private void canvasRoom_MouseRightButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (e.OriginalSource is not Shape shape) return;

            if(!isOverlappingAny(shape, new Vector2((float)Canvas.GetLeft(shape), (float)Canvas.GetTop(shape)), true) &&
                isInsideCanvas(Canvas.GetLeft(shape), Canvas.GetTop(shape), shape.ActualHeight, shape.ActualWidth))
            {
                double temp = shape.Width;
                shape.Width = shape.Height;
                shape.Height = temp;
            }
        }
    }
}