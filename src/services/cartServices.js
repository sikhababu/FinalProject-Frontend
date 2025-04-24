import userInstance from "../axios/axiosinstance"

export const listCart = () => {

    return userInstance.get("cart/getCartDetails")

}


export const addToCart = (data) => {

    return userInstance.post("cart/addToCart", data)

}


export const clearCart = () => {
    return userInstance.delete("cart/clearCart");
};

export const removeFromCart = (productId) => {
    return userInstance.post("cart/removeFromCart", { productId });
};


export const makePayment = (data) => {

    return userInstance.post("payment/makepayment", data)

}