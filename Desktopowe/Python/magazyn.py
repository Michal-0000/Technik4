def loadProducts(fileName):
    products = []
    try:
        with open(fileName, "r", encoding="utf-8") as file:
            for line in file:
                data = line.strip().split(',')
                if len(data) != 3:
                    continue

                try: 
                    name = data[0].strip()
                    amount = int(data[1].strip())
                    price = float(data[2].strip())

                    products.append([
                        name,
                        amount,
                        price
                    ])
                except ValueError:
                    print(f"Pominieto niepoprawne dane: {line}")


    except FileNotFoundError:
        print("Podany plik nie istnieje")

    return products

def showProducts(products):
    for product in products:
        print("--------------------------------")
        print(f"Nazwa: {product[0]}")
        print(f"Ilość: {product[1]}")
        print(f"Cena: {product[2]:.2f} PLN")
    print("--------------------------------")

def sortuj_babelkowo(products):
    n = len(products)

    for i in range(n-1):
        for j in range(n-1-i):
            if products[j][1] > products[j+1][1]:
                products[j], products[j+1] = products[j+1], products[j]


def sortuj_wstawianie(products):
    n = len(products)

    for i in range(1, n):
        key = products[i]
        j = i - 1

        while j >= 0 and products[j][2] < key[2]:
            products[j+1]=products[j]
            j -= 1

        products[j+1] = key



def main():
    products = loadProducts("produkty.txt")
    
    while True:
            print("1. Wyświetl wszystkie produkty")
            print("2. Sortuj po ilości (Własny algorytm: Sortowanie bąbelkowe – rosnąco)")
            print("3. Sortuj po cenie (Własny algorytm: Sortowanie przez wstawianie – malejąco)")
            print("4. Wyjście")
    
            responce = input()
            match responce:
                case "1":
                    showProducts(products)
                case "2":
                    sortuj_babelkowo(products)
                    print("Posortowano po ilosci")
                case "3":
                    sortuj_wstawianie(products)
                    print("Posortowano po cenie")
                case "4":
                    return
                case _:
                    print("Niepoprawna opcja")
                    continue



if __name__ == '__main__':
    main()    