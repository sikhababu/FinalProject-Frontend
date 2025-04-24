import userInstance from "../axios/axiosinstance"

export const userLogin = (data, role) => {

    return userInstance.post(`/user/login`, { ...data, role });
    
  };

  export const userSignup = (data) => {

    return userInstance.post(`/user/signup`, { ...data });
    
  };

  export const getUserProfile = (data) => {

    return userInstance.get(`/user/signup`, { ...data });
    
  };

  export const fetchUserProfile = (userId) => {
    return userInstance.get(`/user/searchuser/${userId}`);
  };

  