let basket = JSON.parse(localStorage.getItem("data")) || [];

const cartAmountUpdate = () => {
  const cartAmount = document.getElementById("cart-amount");

  cartAmount.innerHTML = basket
    .map((obj) => obj.item)
    .reduce((a, b) => a + b, 0);
};

cartAmountUpdate();
