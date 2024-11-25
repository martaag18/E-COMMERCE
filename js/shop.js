// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1

function buy(productId) {
  const product = products.find((product) => {
    return product.id === productId;
  });

  if (!product) {
    console.error(`Product with ID ${productId} doesn't exist`);
  } else {
    //Check if product it's already in our cart -- loop for of

    let productInCart = null;

    for (const item of cart) {
      if (item.id === productId) {
        productInCart = item;
        console.log(`Item: ${item.id}, already exists`);
        break;
      }
    }

    if (productInCart) {
      productInCart.quantity = productInCart.quantity + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  }

  console.log(`Updated cart: `, cart);

  //Update count_product

  const $countProduct = document.getElementById("count_product");
  const totalCountProduct = cart.reduce((sum,item) => { //sum = acumulador / item=elemento actual array que recorremos en cada iteración
    return sum + item.quantity;
  }, 0);
  $countProduct.innerHTML = totalCountProduct;

  calculateTotal();
  applyPromotionsCart();
}

// Exercise 2
function cleanCart() {

  cart.splice(0, cart.length);
  console.log(`Cart has been cleaned: ${cart}`);

 printCart();
}

// Exercise 3
function calculateTotal() {
  let sumCartImport = 0;

  for (let i = 0; i < cart.length; i++) {
    sumCartImport += cart[i].price * cart[i].quantity;
  }
  console.log(`Total import: ${sumCartImport}`);
}

// Exercise 4

function applyPromotionsCart() {
  let subtotalWithDiscount = 0;

  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];

    if (product.id === 1 && product.quantity >= 3) {
      product.price = product.price * 0.8;
      console.log(`Product: ${product.name} New Price: ${product.price}`);
    }
    if (product.id === 3 && product.quantity >= 10) {
      product.price = product.price * 0.7;
      console.log(`Product: ${product.name} New Price: ${product.price}`);
    }

    subtotalWithDiscount += product.price * product.quantity;
  }

  console.log(
    `New import with applied discounts: ${subtotalWithDiscount.toFixed(2)}`
  );
}
// Exercise 5

function printCart() {
  //1. Seleccionar parte HTML que queremos modificar:
  const $cartTable = document.querySelector(
    "#cartModal .modal-body #cart_list"
  );
  const $totalElement = document.querySelector(
    "#cartModal .modal-body #total_price"
  );
  console.log("Cart Table:", $cartTable);
  console.log("Total Element:", $totalElement);

  let cartHTML = "";
  let cartTotal = 0;

  //Recorremos array cart: 1.Sumamos total precio producto + acumulamos total productos + recorremos informacion (name, price, quantity)

  for (let i = 0; i < cart.length; i++) {
    const productTotal = cart[i].price * cart[i].quantity; //Sumar total precio producto
    cartTotal = cartTotal + productTotal; //Sumar total cart

    //Mostrar name, price, quantity, productTotal en HTML
    cartHTML += `
    <tr>
      <th scope="row">${cart[i].name}</th>
      <td>${cart[i].price.toFixed(2)}</td>
      <td>${cart[i].quantity}</td>
      <td>${productTotal.toFixed(2)}</td> 
    </tr>
`;
  }

  //Insertamos info cart al HTML:

  $cartTable.innerHTML = cartHTML;
  $totalElement.innerHTML = `Total: ${cartTotal.toFixed(2)} €`;
}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
  //Restar quantity producto -> Recorrer array card

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity -= 1;
    }
  }

  //Filtrar productos con qty > 0

  cart = cart.filter((item) => {
    return item.quantity > 0;
  });
  
  calculateTotal(); //Actualizar total
  applyPromotionsCart(); //Actualizar promociones
  printCart(); //Actualizar HTML
}

function open_modal() {
  printCart();
}
