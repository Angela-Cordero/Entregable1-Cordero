const products = [
  {
    id: 1,
    name: "pizza",
    price: 10,
  },
  {
    id: 2,
    name: "hotdog",
    price: 8,
  },
  {
    id: 3,
    name: "burger",
    price: 15,
  },
  {
    id: 4,
    name: "sandwich",
    price: 13,
  },
  {
    id: 5,
    name: "soda",
    price: 3,
  },
  {
    id: 6,
    name: "lemonade",
    price: 4,
  },
  {
    id: 7,
    name: "beer",
    price: 5,
  },
  {
    id: 8,
    name: "cake",
    price: 11,
  },
  {
    id: 9,
    name: "ice-cream",
    price: 7,
  },
  {
    id: 10,
    name: "brownie",
    price: 5,
  },
  {
    id: 11,
    name: "cookies",
    price: 2,
  },
];

let productsContainer = document.getElementById("products-container");

function renderProducts(productsArray) {
  productsArray.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("products");
    card.innerHTML = `<h4>${product.name}</h4>
    <p>${product.price}</p>
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

  orderContainer.innerHTML = "";

  if (orderedProducts.length > 0) {
    orderedProducts.forEach((product) => {
      const card = document.createElement("div");
      card.innerHTML = `<h4>${product.name}</h4>
                    <p>${product.price}</p>
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
