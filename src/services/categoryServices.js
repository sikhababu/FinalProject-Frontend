import userInstance from "../axios/axiosinstance"

export const listCategories = () => {

    return userInstance.get("category/list")

}


