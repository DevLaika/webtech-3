class Cart {
    constructor() {
        this.items = [];
        this.element = document.body.getElementsByTagName("aside")[0];

        let closeButton = document.createElement("button");
        closeButton.appendChild(document.createTextNode("Close"));
        closeButton.className = "button button--red button--margins";
        closeButton.addEventListener("click", () => {
            this.element.style.display = "none";
        });
        this.element.appendChild(closeButton);

        let table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";
        let r = document.createElement("tr");
        table.appendChild(r);
        r.appendChild(document.createElement("th"));
        r.appendChild(document.createElement("th")).appendChild(document.createTextNode("Quantity"));
        r.appendChild(document.createElement("th")).appendChild(document.createTextNode("Item"));
        r.appendChild(document.createElement("th")).appendChild(document.createTextNode("Price"));
        this.element.appendChild(table);

        let orderButton = document.createElement("button");
        orderButton.appendChild(document.createTextNode("Check Out"));
        orderButton.className = "button button--green button--margins";

        orderButton.addEventListener("click", (event) => {
            let form = document.createElement("form");
            form.appendChild(document.createElement("input"))
            dialogContent.replaceChildren(form)
            dialog.showModal();
        })

        this.element.appendChild(orderButton);
    }
    addItem(item) {
        if (this.items.some(i => i.name === item.item.name)) {
            this.items.find(i => i.name === item.item.name).quantity++;
        } else {
            this.items.push({
                ...item.item,
                quantity: 1
            });
        }
        this.element.scrollIntoView();
    }
    getTotal() {
        return this.items.reduce((total, item) => {
            total += item.quantity*item.price.price;
            return total;
        }, 0).toFixed(2);
    }
    displayCart() {
        this.element.style.display = "block";
        this.showItemsInCart();
    }
    showItemsInCart() {
        if (this.items.length === 0) {
            this.element.style.display = "none";
            return;
        }

        let table = this.element.getElementsByTagName("table")[0];

        while (table.childNodes.length > 1) {
            table.removeChild(table.lastChild);
        }

        this.items.forEach(i => {
            let img = document.createElement("img");

            let quantity = document.createElement("input");
            quantity.type = "number";
            quantity.className = "input--styled input--small";
            quantity.value = i.quantity;
            let minus = document.createElement("button");
            minus.appendChild(document.createTextNode("-"));
            minus.className = "button button--small button--red";
            let plus = document.createElement("button");
            plus.appendChild(document.createTextNode("+"));
            plus.className = "button button--small button--green";
            quantity.addEventListener("input", (e) => {
                if (!Number.isNaN(e.target.value)) {
                    i.quantity = e.target.value;
                    this.showItemsInCart();
                    FoodMenuItem.collection.forEach(element => {
                        if (element.item.name === i.name) {
                            console.log(element)
                            element.amount = i.quantity;
                        }
                    });
                }
            });
            minus.addEventListener("click", () => {
                if (i.quantity > 1) {
                    i.quantity--;
                } else {
                    this.items = this.items.filter(i2 => i2.name !== i.name);
                }

                this.showItemsInCart();
                FoodMenuItem.collection.forEach(element => {
                    if (element.item.name === i.name) {
                        console.log(element)
                        element.amount = i.quantity;
                    }
                });
            });
            plus.addEventListener("click", () => {
                i.quantity++;
                this.showItemsInCart();
                FoodMenuItem.collection.forEach(element => {
                    if (element.item.name === i.name) {
                        console.log(element)
                        element.amount = i.quantity;
                    }
                });
            });
            let quantityCell = document.createElement("th");
            quantityCell.appendChild(minus);
            quantityCell.appendChild(quantity);
            quantityCell.appendChild(plus);
            img.className = "cart__image";
            img.src = i.img;
            img.alt = i.name;
            let r = document.createElement("tr");
            table.appendChild(r);
            r.appendChild(document.createElement("th")).appendChild(img);
            r.appendChild(quantityCell);
            r.appendChild(document.createElement("th")).appendChild(document.createTextNode(i.name));
            r.appendChild(document.createElement("th")).appendChild(document.createTextNode("€"+i.price.price));
        });

        let r = document.createElement("tr");
        r.className = "cart__total";
        table.appendChild(r);
        r.appendChild(document.createElement("th"));
        r.appendChild(document.createElement("th"));
        r.appendChild(document.createElement("th")).appendChild(document.createTextNode("Total:"));;
        r.appendChild(document.createElement("th")).appendChild(document.createTextNode("€"+this.getTotal()));
        // for (let i in this.items) {
        //     let item = this.items[i];
        //     let label = item.quantity + "x "+item.item.name+": "+item.item.price;
        //     ul.appendChild(document.createElement("li")).appendChild(document.createTextNode(item.item.name+" ("+item.quantity+")"));
        // }
    }
    checkOutOrder() {
        console.log("to order checkout")
    }
}

let cart = new Cart();