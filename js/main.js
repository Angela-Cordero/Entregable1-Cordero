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

      const existing = orderedProducts.find((p) => p.id == productId);
      if (existing) {
        existing.quantity++;
      } else {
        (selectedProduct.quantity = 1), orderedProducts.push(selectedProduct);
      }

      localStorage.setItem("orderedProducts", JSON.stringify(orderedProducts));
      renderOrderContainer(orderedProducts);

      setTimeout(() => {
        const quantityElement = document
          .querySelector(`.product button[data-id="${productId}"]`)
          ?.parentElement.querySelector(".quantity");
        if (quantityElement) {
          quantityElement.classList.add("updated");
          setTimeout(() => quantityElement.classList.remove("updated"), 300);
        }
      }, 0);
    };
  });
}

renderOrderContainer(orderedProducts);

function renderOrderContainer(orderedProducts) {
  let orderContainer = document.getElementById("orderContainer");

  orderContainer.innerHTML = "";

  if (orderedProducts.length > 0) {
    let total = 0;
    orderedProducts.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product");
      card.innerHTML = `
                    <section class="adjustQuantity"> 
                      <button class="increase" data-id="${product.id}">+</button>
                      <p class="quantity">${product.quantity}</p>
                      <button class="decrease" data-id="${product.id}">-</button>
                    </section>
                    <h4>${product.name}</h4>
                    <p class="price">$${product.price}</p>
                    <button class="buttonRemoveFromOrder" id= "${product.id}"><span class="material-symbols-outlined">delete</span></button>`;
      orderContainer.appendChild(card);

      total += product.price * product.quantity;
    });

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("order-total");
    totalDiv.innerHTML = `<p>Total: $${total}</p>`;

    const sendOrderBtn = document.createElement("button");
    sendOrderBtn.textContent = "Send order to the kitchen";
    sendOrderBtn.classList.add("send-order");
    totalDiv.appendChild(sendOrderBtn);

    orderContainer.appendChild(totalDiv);
  } else {
    orderContainer.innerHTML = "<p>Add some items to your order 👇😋</p>";
  }
}

const orderContainer = document.getElementById("orderContainer");

orderContainer.addEventListener("click", (e) => {
  const increaseBtn = e.target.closest(".increase");
  const decreaseBtn = e.target.closest(".decrease");
  const removeBtn = e.target.closest(".buttonRemoveFromOrder");

  if (increaseBtn || decreaseBtn) {
    const productId = e.target.dataset.id;
    const existing = orderedProducts.find((p) => p.id == productId);

    if (!existing) return;

    if (increaseBtn) {
      existing.quantity++;
    } else if (decreaseBtn && existing.quantity > 1) {
      existing.quantity--;
    } else if (decreaseBtn && existing.quantity === 1) {
      const productElement = e.target.closest(".product");
      if (productElement) {
        productElement.classList.add("fade-out");
        setTimeout(() => {
          orderedProducts = orderedProducts.filter((p) => p.id != productId);
          localStorage.setItem(
            "orderedProducts",
            JSON.stringify(orderedProducts)
          );
          renderOrderContainer(orderedProducts);
        }, 400);
        return;
      }
    }

    const quantityElement = e.target
      .closest(".product")
      ?.querySelector(".quantity");
    if (quantityElement) {
      quantityElement.textContent = existing.quantity;
      quantityElement.classList.add("updated");
      setTimeout(() => quantityElement.classList.remove("updated"), 300);
    }

    localStorage.setItem("orderedProducts", JSON.stringify(orderedProducts));
    renderOrderContainer(orderedProducts);
  }

  if (removeBtn) {
    const productId = removeBtn.id;
    const productElement = e.target.closest(".product");

    if (productElement) {
      productElement.classList.add("fade-out");
      setTimeout(() => {
        orderedProducts = orderedProducts.filter((p) => p.id != productId);
        localStorage.setItem(
          "orderedProducts",
          JSON.stringify(orderedProducts)
        );
        renderOrderContainer(orderedProducts);
      }, 400);
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("send-order")) {
      console.log(orderedProducts);
      showOrderConfirmation();
    }
  });
});

function showOrderConfirmation() {
  if (orderedProducts.length === 0) {
    FileSystemWritableFileStream.fire({
      background: "#faf5e4",
      color: "#004445",
      icon: "info",
      iconColor: "#f8b600",
      title: "Your order is empty!",
      text: "Add some items before sending it to the kitchen 🍔",
      confirmButtonColor: "#f8b600",
    });
    return;
  }

  const orderSummary = orderedProducts
    .map((p) => `${p.name} x ${p.quantity} -> $${p.price * p.quantity}`)
    .join("<br>");

  Swal.fire({
    title: "Confirm your order🧾",
    html: `
    <p>${orderSummary}</p>
    <hr>
    <p><b>Total:</b> $${orderedProducts.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    )}</p>
    `,

    showCancelButton: true,
    cancelButtonText: "Modify order 🤔",
    confirmButtonText: "Send to kitchen 👨‍🍳",
    background: "#1a4841ff",
    color: "#faf5e4",
    confirmButtonColor: "#d59f0cff",
    cancelButtonColor: "rgb(88, 6, 6)",
    reverseButtons: true,
    focusConfirm: false,
    customClass: {
      popup: "rounded-xl shadow-lg",
      title: "text-xl font-semibold",
      confirmButton: "rounded-lg px-4 py-2",
      cancelButton: "rounded-lg px-4 py-2",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        background: "#faf5e4",
        color: "#004445",
        icon: "success",
        iconColor: "#f8b600",
        title: "Your order is being prepared! 😺",
        text: "It’ll be ready in about 20 minutes 🍽️",
        timer: 4000,
        showConfirmButton: false,
      });

      orderedProducts = [];
      localStorage.setItem("orderedProducts", JSON.stringify([]));
      renderOrderContainer([]);
    }
  });
}
