const shop = document.getElementById("shop");

let shopItemsData = [
  {
    id: "jfhgbvnscs",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-1.jpg",
  },
  {
    id: "ioytrhndcv",
    name: "Office Shirt",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg",
  },
  {
    id: "wuefbncxbsn",
    name: "T Shirt",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-3.jpg",
  },
  {
    id: "thyfhcbcv",
    name: "Mens Suit",
    price: 300,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-4.jpg",
  },
];

let basket = [];

const generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      const { id, name, price, desc, img } = item;

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
                            <div id="${id}" class="quantity">0</div>
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
  let search = basket.find((obj) => obj.id === selectedItem.id);

  if (search === undefined) {
    basket.push({ id: selectedItem.id, item: 1 });
  } else {
    search.item++;
  }

  update(selectedItem.id);
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
};

const update = (id) => {
  let search = basket.find((obj) => obj.id === id);
  document.getElementById(id).innerHTML = search.item;
};
