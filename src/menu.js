import coffeeImage from "./coffee.png";
import lunchImage from "./lunch.png";

export function menu() {
    const content = document.querySelector('#content');
    content.textContent = '';
    const menu = document.createElement("div");
    menu.classList.add("menu");

    const title = document.createElement("div");
    title.textContent = "Menu";
    const coffee = document.createElement("img");
    coffee.src = coffeeImage;
    const lunch = document.createElement("img");
    lunch.src = lunchImage;
    const images = document.createElement("div");
    images.classList.add("images");
    images.append(coffee, lunch);

    const description = document.createElement("div");
    const menu1 = document.createElement("div");
    menu1.innerHTML = "<h3>Lunch Special $20</h3>Lobster, shrimp and a garnish."
    const menu2 = document.createElement("div");
    menu2.innerHTML = "<h3>Set Upgrade $45</h3>Adds a drink, side salad and dessert to a menu of your choice."
    const menu3 = document.createElement("div");
    menu3.innerHTML = "<h3>Cappuccino $8</h3>Classic cappuccino for a sunny afternoon."
    description.append(menu1, menu2, menu3);

    menu.append(title, images, description);
    content.append(menu);

}