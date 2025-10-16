// const food = ["pizza", "hotdog", "burger", "sandwich"];
// var drinks = ["soda", "lemonade", "beer"];

// alert(
//   "👋We are happy to have you here today!  \n This is our menu 📃:\n  -Food: pizza 🍕, hotdog 🌭, burger 🍔, sandwich 🥪 \n  -Drinks: soda🥤, lemonade🍋‍🟩, beer🍺"
// );

// // function placeOrder() {
// var desiredFood = prompt("What food do you want today?");

// while (!food.includes(desiredFood)) {
//   alert(
//     "Sorry, we don't have " +
//       desiredFood +
//       "😥, please choose another option. Food: pizza, hotdog, burger, sandwich"
//   );
//   var desiredFood = prompt("What do you want to eat today?");
// }

// var chosenFood = desiredFood;

// alert("Awesome! we have " + chosenFood + "😋");

// var desiredDrink = prompt("What do you want to drink today?");

// while (!drinks.includes(desiredDrink)) {
//   alert(
//     "Sorry, we don't have " +
//       desiredDrink +
//       "😥, please choose another option. Drinks: soda, lemonade, beer."
//   );
//   var desiredDrink = prompt("What do you want to drink today?");
// }

// var chosenDrink = desiredDrink;

// alert("Awesome! we have " + chosenDrink + "😋");

// function confirmOrder(food, drink) {
//   let confirmation = prompt(
//     "Your order is " +
//       food +
//       " and " +
//       drink +
//       " Is your order correct? (yes/no)"
//   );
//   if (confirmation === "yes") {
//     alert(
//       "Thank you for confirming 😀. It will be ready in about 20 minutes ⌛."
//     );
//   } else {
//     alert(
//       "We are sorry about that. Please refresh the page and place a new order 👇. Thank you! 🙏"
//     );
//   }
// }

// confirmOrder(chosenFood, chosenDrink);
// Example of how to properly add an event listener to a button
// First, select the button element (assuming it has an id="orderButton")
// var buttonAddToOrder = document.querySelectorAll(".buttonAddtoOrder");

// buttonAddToOrder.forEach(function (button) {
//   button.addEventListener("click", function () {
//     var item = button.closest(".menuItem");
//     var itemName = item.querySelector(".cardTitle").textContent;
//     console.log(itemName);
//   });
// });
