import userInstance from "../axios/axiosinstance"

export const listProducts = () =>{

return userInstance.get("product/list-products")

}

export const createProduct = (formData) => {
    return userInstance.post("/product/create", formData);
  };
  
  export const updateProduct = (productId, formData) => {
    return userInstance.patch(`/product/update-product/${productId}`, formData);
  };
  
  export const deleteProduct = (productId) => {
    return userInstance.delete(`/product/delete-product/${productId}`);
  };