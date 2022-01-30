import axios from 'axios';
const instance =  axios.create({
     baseURL: 'https://ecolivefresh.firebaseio.com/'
 });
export default instance;