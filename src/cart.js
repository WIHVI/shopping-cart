const label = document.getElementById("label");
const shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const cartAmountUpdate = () => {
  const cartAmount = document.getElementById("cart-amount");

  cartAmount.innerHTML = basket
    .map((obj) => obj.item)
    .reduce((a, b) => a + b, 0);
};

cartAmountUpdate();

const generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((obj) => {
        const { id, item } = obj;
        const search = shopItemsData.find((obj) => obj.id === id) || [];
        return `
        <div class="cart-item">
           <img width="100" src="${search.img}" alt="${search.name}">
           <div class="details">
              <div class="title-price-x">
                <h4 class="title-price">
                  <p>${search.name}</p>
                  <p class="cart-item-price">$ ${search.price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
              </div>
              <div class="buttons">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id="${id}" class="quantity">${item}</div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
              <h3>$ ${item * search.price}</h3>
           </div>
        </div>
      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="home-btn">Back to Home</button>
      </a>
    `;
  }
};

generateCartItems();

const increment = (id) => {
  const selectedItem = id;
  let search = basket.find((obj) => obj.id === selectedItem.id);

  if (search === undefined) {
    basket.push({ id: selectedItem.id, item: 1 });
  } else {
    search.item++;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

const decrement = (id) => {
  const selectedItem = id;
  let search = basket.find((obj) => obj.id === selectedItem.id);

  if (search === undefined || search.item === 0) {
    return;
  } else {
    search.item--;
  }

  update(selectedItem.id);
  basket = basket.filter((obj) => obj.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

const update = (id) => {
  let search = basket.find((obj) => obj.id === id);
  document.getElementById(id).innerHTML = search.item;

  cartAmountUpdate();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((obj) => obj.id !== selectedItem.id);
  generateCartItems();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

const totalAmount = () => {
  if (basket.length !== 0) {
    const amount = basket
      .map((obj) => {
        const { item, id } = obj;
        const search = shopItemsData.find((obj) => obj.id === id) || [];
        return item * search.price;
      })
      .reduce((a, b) => a + b, 0);

    label.innerHTML = `<h2>Total Bill: $ ${amount}`;
  } else return;
};

totalAmount();
