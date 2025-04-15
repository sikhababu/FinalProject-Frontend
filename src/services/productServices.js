import userInstance from "../axios/axiosinstance"

export const listProducts = () =>{

return userInstance.get("product/list-products")

}