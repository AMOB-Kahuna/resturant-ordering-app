import menuArray from "/data.js"

const menuContainer = document.querySelector("#menus-container")
const cartItems = document.querySelector("#cart-items")
const totalPrice = document.querySelector("#total-price")
const cart = document.querySelector("#cart")
const paymentModal = document.querySelector("#payment-modal")
const paymentForm = document.querySelector("#payment-form")
const message = document.querySelector("#message")

let totalCartPrice = 0

document.addEventListener("click", (e) => {
    if(e.target.dataset.add) {
        addToCart(parseInt(e.target.dataset.add))
    } else if(e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    } else if(e.target.id === "order-btn") {
        paymentModal.style.display = "block"
    }
})

paymentForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get('full-name')

    paymentModal.style.display = 'none'
    cart.style.display = 'none'
    message.innerHTML = `<p class="bold-text">Thanks, ${fullName}! Your order is on its way!</p>`
    message.style.display = 'block'
})

function renderMenu() {

    const menuContent = menuArray.map( item => {
        const {name, ingredients, price, emoji, id} = item
        return `<section class="menu-item outer">
            <div class="inner">
                <p class="menu-img">${emoji}</p>
                <div class="menu-details" id="menu-details">
                    <h2 class="bold-text">${name}</h2>
                    <p class="flavour">${ingredients.join(", ")}</p>
                    <p class="price-text">$${price}</p>
                </div>
            </div>
            <button class="add-to-cart-btn" id="add-btn" data-add="${id}">+</button>
        </section>`
    })

    menuContainer.innerHTML = menuContent.join("")
}

function addToCart(menuId) {
    cart.style.display = "block"
    const targetItem = menuArray.filter( item => item.id === menuId)
    const {name, price, id} = targetItem[0]
    cartItems.innerHTML += `
        <div class="cart-item outer">
            <div class="inner">
                <p class="bold-text">${name}</p>
                <button class="remove-btn" id="remove-btn" data-remove="${id}">remove</button>
            </div>
            <p class="price-text">$${price}</p>
        </div>
    `
    totalCartPrice += price
    displayTotalPrice(totalCartPrice)
}

function displayTotalPrice(price) {
    totalPrice.innerHTML = `
        <p class="bold-text">Total price:</p>
        <p class="price-text">$${price}</p>
    `
}

function removeItem(itemId) {
    const itemToRemove = document.querySelector(`[data-remove="${itemId}"]`).closest(".cart-item");
    const itemPrice = parseFloat(itemToRemove.querySelector(".price-text").textContent.replace("$", ""));
    
    // Remove the item from the DOM
    itemToRemove.remove();
    
    // Update the total cart price
    totalCartPrice -= itemPrice;
    displayTotalPrice(totalCartPrice);

    // Hide the cart if it's empty
    if (cartItems.children.length === 0) {
        cart.style.display = "none";
    }
}




renderMenu()