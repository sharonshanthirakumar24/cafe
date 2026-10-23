/* =========================
   CART DATA
========================= */

let cart = [];


/* =========================
   WELCOME BANNER
========================= */

function closeWelcome() {

    const banner =
        document.getElementById("welcomeBanner");

    banner.classList.add("hide");

}


/* =========================
   ADD TO CART
========================= */

function addToCart(name, price) {

    const existingItem =
        cart.find(item => item.name === name);


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }


    updateCart();

    // Open cart automatically

    openCart();

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    /* Calculate total quantity */

    let totalQuantity = 0;

    cart.forEach(item => {

        totalQuantity += item.quantity;

    });


    cartCount.textContent =
        totalQuantity;


    /* Empty cart */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent =
            "Rs. 0";

        return;

    }


    /* Create cart items */

    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    Rs. ${item.price}
                    × ${item.quantity}
                </p>

            </div>

            <div>

                <strong>
                    Rs. ${itemTotal}
                </strong>

                <button
                    onclick="removeItem(${index})">
                    ×
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =
        "Rs. " + total;

}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    updateCart();

}


/* =========================
   OPEN CART
========================= */

function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

}


/* =========================
   PLACE ORDER
========================= */

function placeOrder() {

    if (cart.length === 0) {

        alert("Please add an item to your order.");

        return;

    }


    // Clear cart

    cart = [];

    updateCart();

    closeCart();


    // Show thank you message

    document
        .getElementById("thankYou")
        .classList.add("active");

}


/* =========================
   CLOSE THANK YOU
========================= */

function closeThankYou() {

    document
        .getElementById("thankYou")
        .classList.remove("active");

}