let productsContainer = document.getElementById("products-container");

let orderedProducts = JSON.parse(localStorage.getItem("orderedProducts")) || [];

fetch("products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error when getting JSON");
    }
    return response.json();
  })
  .then((products) => {
    renderProducts(products);
    AddToOrder(products);
    renderOrderContainer(orderedProducts);
  })
  .catch((error) => console.error("There was a problem while loading:", error));

function renderProducts(productsArray) {
  productsArray.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("products");
    card.innerHTML = `
    <div class="menuItem">
      <img src="${product.URL}" alt="${product.name}" width="120">
        <div>
          <div class="titlePrice">
              <h4 class="cardTitle">${product.name}</h4>
              <p class="cardPrice">$${product.price}</p>
          </div>
          <p class="cardDesc">${product.description}</p>

          <div class="addToOrder">
            <button class="buttonAddToOrder" id= "${product.id}">Add to order</button>
          </div>

        </div>
    </div>`;
    productsContainer.appendChild(card);
  });
  AddToOrder();
}

function AddToOrder(products) {
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
      card.innerHTML = `
                    <section class="adjustQuantity"> 
                      <button class="increase">+</button>
                      <p class="quantity">1</p>
                      <button class="decrease">-</button>
                    </section>
                    <h4>${product.name}</h4>
                    <p class="price">$${product.price}</p>
                    <button class="buttonRemoveFromOrder" id= "${product.id}"><span class="material-symbols-outlined">delete</span></button>`;
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
