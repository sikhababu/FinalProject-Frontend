import userInstance from "../axios/axiosinstance"

export const userLogin = (data) =>{

return userInstance.post("/user/login",data)

}