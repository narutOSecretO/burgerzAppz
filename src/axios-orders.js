import axios from 'axios';

let instance = axios.create({
    baseURL: 'https://burgerbuilder-12f11-default-rtdb.firebaseio.com/'
})

export default instance;