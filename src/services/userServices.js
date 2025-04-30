import userInstance from "../axios/axiosinstance"

export const userLogin = (data, role) => {

    return userInstance.post(`/user/login`, { ...data, role });
    
  };

  export const userSignup = (data) => {

    return userInstance.post(`/user/signup`, { ...data });
    
  };

  

  export const fetchUserProfile = (userId) => {
    return userInstance.get(`/user/searchuser/${userId}`);
  };

  

// Update user profile
export const updateUserProfile = (userId, userData) => {

  return userInstance.put(`/user/updateuser/${userId}`,userData);
  
};

  