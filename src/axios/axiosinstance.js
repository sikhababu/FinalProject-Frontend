import axios from 'axios'

const userInstance = axios.create({

    baseURL : "http://localhost:5000"
})

export default userInstance