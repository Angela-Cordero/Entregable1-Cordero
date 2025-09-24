const food = ["pizza", "hotdog", "burguer", "sandwich"];
var drinks = ["soda", "lemonade", "beer"];
const desserts = ["cake", "ice-cream", "cookies", "brownie"];

alert(
  "We are happy to have you here today! \n This is our menu:\n  -Food: pizza, hotdog, burguer, sandwich \n  -Drinks: soda, lemonade, beer\n  -Desserts: cake, ice-cream, cookies, brownie"
);

var desiredFood = prompt("What food do you want today?");

if (food.includes(desiredFood)) {
  var chosenFood = desiredFood;
  alert("Awesome! we have " + chosenFood + "😋");
} else {
  alert(
    "Sorry, we don't have that 😥, please choose another option. Food: pizza, hotdog, burguer, sandwich"
  );
  prompt("What food do you want today?");
}

var desiredDrink = prompt("What drink do you want today?");

if (drinks.includes(desiredDrink)) {
  var chosenDrink = desiredDrink;
  alert("Awesome! we have " + chosenDrink + "🥤");
} else {
  alert(
    "Sorry, we don't have that 😥, please choose another option. Drinks: soda, lemonade, beer"
  );
  prompt("What drink do you want today?");
}
