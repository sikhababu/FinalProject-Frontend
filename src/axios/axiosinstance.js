import axios from 'axios'

const userInstance = axios.create({

    baseURL : import.meta.env.VITE_BASEURL
})


userInstance.interceptors.request.use((request)=>{

    const token = localStorage.getItem("token")
    request.headers.Authorization = `Bearer ${token}`
    return request;
})

export default userInstance;
