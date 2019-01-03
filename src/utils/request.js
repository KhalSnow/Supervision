import axios from "axios"
//import store from '../vuex'

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 30000,
    withCredentials: true
})

// service.interceptors.request.use(config => {
//     if (store.state.token) {
//       config.headers['token'] = window.localStorage['token']
//     }
// })

export default service
