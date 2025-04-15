import axios from 'axios'

const userInstance = axios.create({

    baseURL : "http://localhost:5000"
})


userInstance.interceptors.request.use((request)=>{

    const token = localStorage.getItem("token")
    request.headers.Authorization = `Bearer ${token}`
    return request;
})

export default userInstance;
