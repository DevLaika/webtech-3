
// Example of event propagation, the click event from the buttons bubbles up to the body,
// where they are caught. These are then used to open the aside cart.
document.body.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        let aside = document.getElementsByTagName("aside")[0];
        if (aside) {
            aside.hidden = false;
        }
    }
});


class Price {
    constructor(price) {
        this.price = price;
    }

    getString() {
        return this.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'EUR',
        });
    }
}

class Menu {
    constructor(parent, foods) {
        console.log(foods);
        let categories = foods.reduce((result, item) => {
            result[item.category] = result[item.category] || [];
            result[item.category].push(item);
            return result;
        }, {});
        this.sections = [];
        this.element = document.createElement("article");
        this.element.appendChild(document.createElement("h1")).appendChild(document.createTextNode("Menu"));
        this.element.appendChild(document.createElement("p")).appendChild(document.createTextNode("This is our menu. These are the items we offer day-to-day, special offers and weekly dishes are available in-store."));
        for (const category in categories) {
            console.log(category);
            this.sections.push(new MenuSection(this.element, category, categories[category]));
        }
        parent.appendChild(this.element);
    }

    getElement() {
        return element;
    }
}

class MenuSection {
    constructor(parent, name, foods) {
        this.name = name;

        this.cards = [];
        this.element = document.createElement("section");

        this.element.appendChild(document.createElement("h2")).appendChild(document.createTextNode(this.name));

        let list = document.createElement("ul");
        list.classList.add("menu__list");
        foods.forEach(item => {
            this.cards.push(new FoodMenuItem(list, item));
        });
        this.element.appendChild(list);

        parent.appendChild(this.element);
    }

}

class Food {
    static collection = [];

    constructor(item) {
        this.name = item.name;
        this.category = item.category;
        this.price = item.price;
        this.img = item.img;

        Food.collection.push(this);
    }
}

class FoodMenuItem {
    static collection = [];

    constructor(parent, item) {
        this._amount = 0;
        this.item = item;

        this.amountIcon = document.createElement("span");
        this.amount = 0;

        this.amountIcon.appendChild(document.createTextNode(this.amount));
        this.amountIcon.classList.add("menu__amount");
        this.amountIcon.hidden = true;

        this.element = document.createElement("li");
        let element2 = document.createElement("div");

        this.element.appendChild(this.amountIcon);
        element2.classList.add("menu__info");
        this.element.appendChild(element2);
        this.element.classList.add("menu__item");

        let img = document.createElement("img");
        img.classList.add("menu__image");
        img.src = this.item.img;

        let div = document.createElement("div");
        div.classList.add("menu__label");

        let pName = document.createElement("p");
        pName.classList.add("name");
        pName.appendChild(document.createTextNode(this.item.name));

        let pPrice = document.createElement("p");
        pPrice.classList.add("label__price");
        pPrice.appendChild(document.createTextNode(this.item.price.getString()));

        div.appendChild(pName);
        div.appendChild(pPrice);

        let button = document.createElement("button");
        button.appendChild(document.createTextNode("Order"));

        button.addEventListener("click", () => {

            cart.addItem(new FoodCartItem(this.item));
            cart.displayCart();

            this.amount++;
            // this.updateAmountIcon();

        });

        element2.appendChild(img);
        element2.appendChild(div);
        this.element.appendChild(button);

        parent.appendChild(this.element);
        FoodMenuItem.collection.push(this)

    }

    set amount(value) {
        this._amount = value;
        console.log(value);
        this.amountIcon.textContent = value;
        this.amountIcon.hidden = value == 0 ? true : false;
    }
    get amount() {
        return this._amount;
    }
}

class Drink extends Food {
    constructor(item) {
        super(item);
        this.category = "Drinks";
    }
}

class Burger extends Food {
    constructor(item) {
        super(item);
        this.category = "Burgers";
    }
}

class Side extends Food {
    constructor(item) {
        super(item);
        this.category = "Sides";
    }
}

class Meal extends Food {
    constructor(item) {
        super(item);
        this.category = "Meals";
    }
}

class FoodCartItem {

    constructor(item) {
        this.item = item;
    }
}

new Burger({
    name: "Chicken burger",
    price: new Price(2.99),
    img: "src/images/8.jpg"
});
new Side({
    name: "Fries",
    price: new Price(2.99),
    img: "src/images/9.jpg"
});
new Burger({
    name: "Classic burger",
    price: new Price(2.99),
    img: "src/images/10.jpg"
});
new Meal({
    name: "Cheeseburger meal",
    price: new Price(2.99),
    img: "src/images/11.jpg"
});
new Meal({
    name: "Goat-cheeseburger meal",
    price: new Price(2.99),
    img: "src/images/12.jpg"
});
new Meal({
    name: "Veggieburger meal",
    price: new Price(2.99),
    img: "src/images/13.jpg"
});
new Meal({
    name: "Chicken burger meal",
    price: new Price(2.99),
    img: "src/images/14.jpg"
});
new Burger({
    name: "Cheeseburger",
    price: new Price(2.99),
    img: "src/images/15.jpg"
});
new Meal({
    name: "Classic burger meal",
    price: new Price(2.99),
    img: "src/images/16.jpg"
});
new Drink({
    name: "Lipton peach",
    price: new Price(2.99),
    img: "src/images/5.jpg"
});
new Drink({
    name: "Sprite",
    price: new Price(2.99),
    img: "src/images/1.jpg"
});
new Drink({
    name: "Fanta cassis",
    price: new Price(2.99),
    img: "src/images/2.jpg"
});
new Drink({
    name: "Lipton original",
    price: new Price(2.99),
    img: "src/images/3.jpg"
});
new Drink({
    name: "Lipton green",
    price: new Price(2.99),
    img: "src/images/4.jpg"
});
new Drink({
    name: "Water",
    price: new Price(2.99),
    img: "src/images/6.jpg"
});
new Drink({
    name: "Sparkeling water",
    price: new Price(2.99),
    img: "src/images/7.jpg"
});
new Side({
    name: "Salad",
    price: new Price(3.99),
    img: "src/images/18.jpg"
});
new Burger({
    name: "Portobello burger",
    price: new Price(10.99),
    img: "src/images/17.jpg"
});

let menu = new Menu(document.getElementsByTagName("article")[0], Food.collection);
