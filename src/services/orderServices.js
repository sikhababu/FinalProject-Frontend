import userInstance from "../axios/axiosinstance"

export const getSellerOrders  = () => {

    return userInstance.get("order/seller-orders")

}


export const updateOrderStatus = (orderId, orderStatus) =>{ 
    
    return userInstance.put(`/order/update/${orderId}`, {orderStatus});

}

export const createOrder = () =>{ 
    
    return userInstance.post("/order/create");

}


export const getUserOrders = () => {
    return userInstance.get("/order/my-orders");
  };
  




