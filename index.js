import menuArray from "/data.js"

const menuContianer = document.querySelector("#menus-container");

function renderMenu() {

    const menuContent = menuArray.map( item => {
        return `<section class="menu-item outer">
            <div class="inner">
                <p class="menu-img">${item.emoji}</p>
                <div class="menu-details" id="menu-details">
                    <h2 class="bold-text">${item.name}</h2>
                    <p class="flavour">${item.ingredients.join(", ")}</p>
                    <p class="price-text">$${item.price}</p>
                </div>
            </div>
            <button class="add-to-cart-btn">+</button>
        </section>`
    })

    menuContianer.innerHTML = menuContent.join("")
}

renderMenu()

