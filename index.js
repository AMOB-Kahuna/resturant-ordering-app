import menuArray from "/data.js"

const menuContianer = document.querySelector("#menus-container")
const cartItems = document.querySelector("#cart-items")
const totalPrice = document.querySelector("#total-price")
const cart = document.querySelector("#cart")

let totalCartPrice = 0

document.addEventListener("click", (e) => {
    if(e.target.dataset.add) {
        addToCart(parseInt(e.target.dataset.add))
    }
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
            <button class="add-to-cart-btn" id="add-btn" data-add="${item.id}">+</button>
        </section>`
    })

    menuContianer.innerHTML = menuContent.join("")
}

function addToCart(menuId) {
    cart.style.display = "block"
    const targetItem = menuArray.filter( item => item.id === menuId)
    const {name, price} = targetItem[0]
    cartItems.innerHTML += `
        <div class="cart-item outer">
            <div class="inner">
                <p class="bold-text">${name}</p>
                <button class="remove-btn" id="remove-btn">remove</button>
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



renderMenu()