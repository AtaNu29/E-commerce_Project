import products from "./api/product.json";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { getCartProductFromLS } from "./getCartProducts";
import { incrementDecrement } from "./incrementDecrement";
import { removeProdFromCart } from "./removeProdFromCart";
import { updateCartProductTotal } from "./updateCartProductTotal";
import { updateCartValue } from "./updateCartValue";

let cartProducts = getCartProductFromLS();


let filterProducts = products.filter((curProd) => {
    return cartProducts.some((curElem) => curElem.id === curProd.id);
});

 console.log(filterProducts);


// // update add to cart page //

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
    filterProducts.forEach((curProd) => {
        const { category, id, image, name, price, stock  } = curProd;

        let productClone = document.importNode(templateContainer.content, true);

        const lSActualData = fetchQuantityFromCartLS(id, price);
        
        productClone.querySelector("#cartValue").setAttribute("id", `card${id}`);
        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;

        productClone.querySelector(".productQuantity").textContent = lSActualData.quantity;
        productClone.querySelector(".productPrice").textContent = lSActualData.price;

        productClone
        .querySelector(".stockElement")
        .addEventListener("click", (event) => {
            incrementDecrement(event, id, stock, price);
        });

        productClone.querySelector(".remove-to-cart-button").addEventListener("click", () => removeProdFromCart(id));


        cartElement.appendChild(productClone);
    });
};
// cart product show

showCartProduct();

updateCartProductTotal();