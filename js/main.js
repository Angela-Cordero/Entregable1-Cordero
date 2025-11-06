const products = [
  {
    id: 1,
    name: "Lasagna",
    price: 10,
    URL: "https://i.postimg.cc/8jVYY5L2/lasagna.jpg",
  },
  {
    id: 2,
    name: "Pizza",
    price: 8,
    URL: "https://i.postimg.cc/w7drrvhd/pizza.jpg",
  },
  {
    id: 3,
    name: "Burger",
    price: 15,
    URL: "https://i.postimg.cc/9z9S1Tws/burger.jpg",
  },
  {
    id: 4,
    name: "Sandwich",
    price: 13,
    URL: "https://i.postimg.cc/kRWp43d2/sandwich.jpg[/img",
  },
  {
    id: 5,
    name: "Iced tea",
    price: 3,
    URL: "https://i.postimg.cc/Sj95V8zk/iced-tea.jpg",
  },
  {
    id: 6,
    name: "Lemonade",
    price: 4,
    URL: "https://i.postimg.cc/4mT00dpr/lemonade.jpg",
  },
  {
    id: 7,
    name: "Banana smothie",
    price: 5,
    URL: "https://i.postimg.cc/F1SqGckq/banana-smothie.jpg[/img",
  },
  {
    id: 8,
    name: "cake",
    price: 11,
    URL: "https://i.postimg.cc/23WJTvBp/cake.jpg",
  },
  {
    id: 9,
    name: "Chocolate mousse",
    price: 7,
    URL: "https://i.postimg.cc/nMm5T7QJ/chocolate-mousse.jpg",
  },
  {
    id: 10,
    name: "Lemon cheesecake",
    price: 5,
    URL: "https://i.postimg.cc/4ncMwtHq/cheesecake.jpg",
  },
];

let productsContainer = document.getElementById("products-container");

function renderProducts(productsArray) {
  productsArray.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("products");
    card.innerHTML = `<img src="${product.URL}" 
      alt="${product.name}" width="120">
    <h4>${product.name}</h4>
    <p>$${product.price}</p>
    <button class="buttonAddToOrder" id= "${product.id}">Add to order</button>`;
    productsContainer.appendChild(card);
  });
  AddToOrder();
}
let orderedProducts = JSON.parse(localStorage.getItem("orderedProducts")) || [];
renderProducts(products);

function AddToOrder() {
  addButton = document.querySelectorAll(".buttonAddToOrder");
  addButton.forEach((button) => {
    button.onclick = (e) => {
      const productId = e.currentTarget.id;
      const selectedProduct = products.find(
        (product) => product.id == productId
      );

      orderedProducts.push(selectedProduct);
      console.log(orderedProducts);

      localStorage.setItem("orderedProducts", JSON.stringify(orderedProducts));
      renderOrderContainer(orderedProducts);
    };
  });
}

renderOrderContainer(orderedProducts);

function renderOrderContainer(orderedProducts) {
  let orderContainer = document.getElementById("orderContainer");

  orderContainer.innerHTML = "Your order";

  if (orderedProducts.length > 0) {
    orderedProducts.forEach((product) => {
      const card = document.createElement("div");
      card.innerHTML = `<img src="${product.URL}" 
      alt="${product.name}" width="50">
                    <h4>${product.name}</h4>
                    <p>$${product.price}</p>
                    <button class="buttonRemoveFromOrder" id= "${product.id}">Remove</button>`;
      orderContainer.appendChild(card);
    });
    removeFromOrder();
  } else {
    orderContainer.innerHTML = "<p>There are no items in your order</p>";
  }
}

function removeFromOrder() {
  removeButton = document.querySelectorAll(".buttonRemoveFromOrder");
  removeButton.forEach((button) => {
    button.onclick = (e) => {
      const productId = e.currentTarget.id;

      orderedProducts = orderedProducts.filter(
        (product) => product.id != productId
      );

      console.log("pedido actualizado", orderedProducts);

      localStorage.setItem("orderedProducts", JSON.stringify(orderedProducts));

      renderOrderContainer(orderedProducts);
    };
  });
}
