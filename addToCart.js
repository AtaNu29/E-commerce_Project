import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";


getCartProductFromLS();


export const addToCart = (event, id, stock) => {

    let arrLocalStorageProduct = getCartProductFromLS();

    const currentProdElem = document.querySelector(`#card${id}`);

    let quantity = currentProdElem.querySelector(".productQuantity").innerText;
    let price = currentProdElem.querySelector(".productPrice").innerText;

    // console.log(quantity, price);
    price = price.replace("₹", "");


    let existingProd = arrLocalStorageProduct.find( (curProd) => curProd.id === id );

    if(existingProd && quantity > 1){
        quantity = Number(existingProd.quantity) + Number(quantity);
        price = Number(price * quantity);
        
        let updateCart = { id, quantity, price };

        updateCart = arrLocalStorageProduct.map((curProd) => {
            return curProd.id === id ? updateCart : curProd;
        });
        console.log(updateCart);

        localStorage.setItem("cartProductLS", JSON.stringify(updateCart));
        // show toast
        showToast("Add", id);
    };


    if (existingProd) {
        // alert("You Chose Duplicate Product")
        return false;
    };

    price = Number(price * quantity);
    quantity = Number(quantity);

    // let updateCart = { id, quantity, price };
    arrLocalStorageProduct.push({ id, quantity, price });
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));


    
    
    // update cart button
    updateCartValue(arrLocalStorageProduct);

    // show toast
    showToast("Add", id);
};