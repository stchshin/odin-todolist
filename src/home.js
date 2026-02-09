import posterImage from "./poster.png";
import restaurant1Image from "./restaurant1.png";
import restaurant2Image from "./restaurant2.png";

export function home () {
    const content = document.querySelector('#content');
    content.textContent = '';
    const home = document.createElement("div");
    home.classList.add("home");

    const introDiv = document.createElement("div");
    const poster = document.createElement("img");
    poster.src = posterImage;
    const introduction = document.createElement("div");
    introduction.textContent = 'Welcome to Trés Bien, the best French restaurant in your area located right next to Vitamin Park';
    introDiv.append(poster, introduction)

    const restaurant1Div = document.createElement("div");
    const restaurant1 = document.createElement("img");
    restaurant1.src = restaurant1Image;
    restaurant1.setAttribute("style", "width: 20vw");
    const introduction2 = document.createElement("div");
    introduction2.textContent = 'We offer a luxurious seating along with specialised food for your events';
    restaurant1Div.append(introduction2, restaurant1);

    const restaurant2Div = document.createElement("div");
    const restaurant2 = document.createElement("img");
    restaurant2.src = restaurant2Image;
    restaurant2.setAttribute("style", "width: 20vw");
    const introduction3 = document.createElement("div");
    introduction3.textContent = 'Coffee and dessert are also available during lunchtime';
    restaurant2Div.append(restaurant2, introduction3);
    
    home.append(introDiv, restaurant1Div, restaurant2Div);
    content.append(home);
}