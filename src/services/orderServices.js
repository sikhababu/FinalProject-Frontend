import userInstance from "../axios/axiosinstance"

export const getSellerOrders  = () => {

    return userInstance.get("order//seller-orders")

}


export const updateOrderStatus = (orderId, data) =>{ 
    
    return userInstance.put(`/orders/update/${orderId}`, data);

}
