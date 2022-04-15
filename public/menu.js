
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
            list.appendChild(new Food(item).genMenuListItem());
        });
        this.element.appendChild(list);

        parent.appendChild(this.element);
    }

}

class Food {
    #amountIcon;
    static collection = [];

    constructor(item) {
        this.name = item.name;
        this.category = item.category;
        this.price = item.price;
        this.img = item.img;
        this.description = item.description;
        this.id = item.id;

        this.#amountIcon = document.createElement("span");

        this.quantity = 0;

        Food.collection.push(this);
    }

    genMenuListItem() {
        const element = document.createElement("li");
        let info = document.createElement("div");

        this.#amountIcon.append(this.quantity);
        this.#amountIcon.classList.add("menu__amount");
        this.#amountIcon.hidden = true;

        element.appendChild(this.#amountIcon);
        info.classList.add("menu__info");
        element.appendChild(info);
        element.classList.add("menu__item");

        let img = document.createElement("img");
        img.classList.add("menu__image");
        img.src = this.img;

        let div = document.createElement("div");
        div.classList.add("menu__label");

        let pName = document.createElement("p");
        pName.classList.add("name");
        pName.appendChild(document.createTextNode(this.name));

        let pPrice = document.createElement("p");
        pPrice.classList.add("label__price");
        pPrice.appendChild(document.createTextNode(this.price.getString()));

        div.appendChild(pName);
        div.appendChild(pPrice);

        let button = document.createElement("button");
        button.appendChild(document.createTextNode("Order"));

        button.addEventListener("click", () => {
            const h = document.createElement("h1");
            h.appendChild(document.createTextNode(this.name));
            dialogContent.replaceChildren(h);
            const s = document.createElement("section");
            s.classList.add("dialog__section", "dialog__section--columns");

            const descSection = document.createElement("div");
            descSection.append(document.createElement("p").appendChild(document.createTextNode(this.description)),document.createElement("p").appendChild(document.createTextNode(this.price.getString())));
            s.append(img.cloneNode(), descSection);

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

                this.quantity += quantity;
                this.update();
                
                for (let index = 0; index < quantity; index++) {
                    cart.addItem(this);
                }
                cart.displayCart();


                dialog.close();
            });

            inputSection.appendChild(quatitiyInput);
            inputSection.appendChild(addToCartButton);
            dialogContent.appendChild(inputSection);
            dialog.showModal();

            // this.updateAmountIcon();

        });

        info.appendChild(img);
        info.appendChild(div);
        element.appendChild(button);

        return element;
    }

    update() {
        this.#amountIcon.replaceChildren(this.quantity);
        if (this.quantity > 0) {
            this.#amountIcon.hidden = false;
        } else {
            this.#amountIcon.hidden = true;
        }
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

const api = axios.create({
    baseURL: 'http://webtech.science.uu.nl/group22:8022/api/',
    
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
                
            case "Sides":
                new Side(dish);
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

