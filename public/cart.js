

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
            this.checkOutOrder();
        })

        this.element.appendChild(orderButton);
    }
    addItem(item) {
        if (this.items.some(i => i.name === item.name)) {
            this.items.find(i => i.name === item.name).quantity++;
        } else {
            this.items.push({
                ...item
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
                    Food.collection.forEach(element => {
                        if (element.id === i.id) {
                            console.log(element)
                            element.quantity = i.quantity;
                            element.update();
                        }
                    });
                    if (i.quantity <= 0) {
                        this.items = this.items.filter(i2 => i2.name !== i.name);
                    }
                    this.showItemsInCart();
                }
            });
            minus.addEventListener("click", () => {
                i.quantity--;
                Food.collection.forEach(element => {
                    if (element.id == i.id) {
                        console.log(element)
                        element.quantity = i.quantity;
                        element.update();
                    }
                });
                if (i.quantity <= 0) {
                    this.items = this.items.filter(i2 => i2.name !== i.name);
                }
                this.showItemsInCart();
            });
            plus.addEventListener("click", () => {
                i.quantity++;
                this.showItemsInCart();
                Food.collection.forEach(element => {
                    if (element.id === i.id) {
                        console.log(element)
                        element.quantity = i.quantity;
                        element.update()
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
        //     let label = item.quantity + "x "+item.name+": "+item.price;
        //     ul.appendChild(document.createElement("li")).appendChild(document.createTextNode(item.name+" ("+item.quantity+")"));
        // }
    }
    checkOutOrder() {
        dialogContent.replaceChildren();

        const h = document.createElement("h1")
        h.append("Check out");
        
        const p = document.createElement("p")
        p.append("Total: €"+this.getTotal());

        const form = document.createElement("form");

        const addressFieldset = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.append("Address")
        addressFieldset.appendChild(legend)
        
        const addressDetailNames = ["country", "city", "postalcode", "street", "number"]

        for (const detailName of addressDetailNames) {
            const upperName = detailName.charAt(0).toUpperCase() + detailName.slice(1);
            const label = document.createElement("label")
            label.append(upperName);
            const input = document.createElement("input")
            input.placeholder = upperName;
            input.name = detailName;
            input.type = "text";
            input.required = true;
            addressFieldset.append(label, input, document.createElement("br"))
        }
        
        const submitButton = document.createElement("input");
        submitButton.type = "submit";
        submitButton.value = "Send order";

        form.append(addressFieldset, submitButton);

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let formData = new FormData(form);
            let orderData = Object.fromEntries(formData.entries());

            let reqData = {
                address: {
                    country: orderData.country,
                    city: orderData.city,
                    postalcode: orderData.postalcode,
                    street: orderData.street,
                    number: orderData.number
                },
                items: []
            }

            for (const item of this.items) {
                reqData.items.push({
                    id: item.id,
                    quantity: item.quantity
                })
            }

            api.post('/order', reqData).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        })

        dialogContent.append(h,p, form)

        dialog.showModal();
    }
}

let cart = new Cart();