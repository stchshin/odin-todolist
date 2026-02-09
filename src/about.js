import armstrongImage from "./armstrong.png";
import kitchenImage from "./kitchen.png";


export function about() {
    const content = document.querySelector('#content');
    content.textContent = '';
    const about = document.createElement("div");
    about.classList.add("about");

    const chef = document.createElement("div");
    const armstrong = document.createElement("img");
    armstrong.src = armstrongImage;
    armstrong.setAttribute("style", "width: 20vw");
    const chefIntro = document.createElement("div");
    chefIntro.textContent = "Jean Armstrong is the head chef of this restaurant. He opened this restaurant in 2017 through his love towards French culture. He also has interest in aromatherapy and often gives out oils to customers around the restaurant.";
    chef.append(armstrong, chefIntro);

    const general = document.createElement("div");
    const kitchen = document.createElement("img");
    kitchen.src = kitchenImage;
    kitchen.setAttribute("style", "width: 30vw");
    const kitchenIntro = document.createElement("div");
    kitchenIntro.textContent = "The restaurant was actually involved in a murder incident a few years ago. Decisive evidence was found in this very kitchen!";
    general.append(kitchenIntro, kitchen);

    about.append(chef, general);
    content.append(about);
}