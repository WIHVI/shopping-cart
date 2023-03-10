const shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      const { id, name, price, desc, img } = item;
      const search = basket.find((obj) => obj.id === id) || [];

      return `
            <div id="product-id-${id}" class="item">
                <img width="219" src=${img} alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id="${id}" class="quantity">
                              ${search.item === undefined ? 0 : search.item}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    })
    .join(""));
};

generateShop();

const increment = (id) => {
  const selectedItem = id;
  const search = basket.find((obj) => obj.id === selectedItem.id);

  if (search === undefined) {
    basket.push({ id: selectedItem.id, item: 1 });
  } else {
    search.item++;
  }

  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

const decrement = (id) => {
  const selectedItem = id;
  const search = basket.find((obj) => obj.id === selectedItem.id);

  if (search === undefined || search.item === 0) {
    return;
  } else {
    search.item--;
  }

  update(selectedItem.id);
  basket = basket.filter((obj) => obj.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

const update = (id) => {
  const search = basket.find((obj) => obj.id === id);
  document.getElementById(id).innerHTML = search.item;

  cartAmountUpdate();
};

const cartAmountUpdate = () => {
  const cartAmount = document.getElementById("cart-amount");

  cartAmount.innerHTML = basket
    .map((obj) => obj.item)
    .reduce((a, b) => a + b, 0);
};

cartAmountUpdate();
