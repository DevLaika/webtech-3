
const dialogContent = document.getElementsByClassName("dialog__content")[0];
const dialog = document.getElementsByClassName("dialog")[0];
const closeButton = document.getElementsByClassName("dialog__close")[0];
closeButton.addEventListener("click", () => {
    dialog.close();
});

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
        this.description = item.description;

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
            const h = document.createElement("h1");
            h.appendChild(document.createTextNode(this.item.name));
            dialogContent.replaceChildren(h);
            const s = document.createElement("section");
            s.classList.add("dialog__section", "dialog__section--columns");
            s.append(img.cloneNode(), document.createElement("p").appendChild(document.createTextNode(this.item.description)));

            dialogContent.appendChild(s);


            const inputSection = document.createElement("section");
            inputSection.classList.add("dialog__section--input");

            const addToCartButton = document.createElement("input");
            addToCartButton.type = "submit";
            addToCartButton.value = "Add to cart";

            const quatitiyInput = document.createElement("input");
            quatitiyInput.classList.add("dialog__input--number");
            quatitiyInput.classList.add("dialog__input");

            quatitiyInput.type = "number";
            quatitiyInput.value = 1;

            addToCartButton.classList.add("dialog__input--submit");
            addToCartButton.classList.add("dialog__input");
            addToCartButton.addEventListener("click", () => {
                let quantity = Number(quatitiyInput.value);

                for (let index = 0; index < quantity; index++) {
                    cart.addItem(new FoodCartItem(this.item));
                }

                cart.displayCart();

                this.amount += quantity;
                dialog.close();
            });

            inputSection.appendChild(quatitiyInput);
            inputSection.appendChild(addToCartButton);
            dialogContent.appendChild(inputSection);
            dialog.showModal();

            // this.updateAmountIcon();

        });

        element2.appendChild(img);
        element2.appendChild(div);
        this.element.appendChild(button);

        parent.appendChild(this.element);
        FoodMenuItem.collection.push(this);

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

const api = axios.create({
    baseURL: 'http://localhost:8022/api/',
});

api.get("/dish").then((res) => {
    for (const dish of res.data) {
        dish.price = new Price(dish.price);
        switch (dish.category) {
            case "Burgers":
                new Burger(dish);
                break;

            case "Drinks":
                new Drink(dish);
                break;

            case "Meals":
                new Meal(dish);
                break;

            default:
                console.log("Unknown category:", dish.category);
                break;
        }
    }
    new Menu(document.getElementsByTagName("article")[0], Food.collection);
}).catch((err) => {
    console.error(err);
});

