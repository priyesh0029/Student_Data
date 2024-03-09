import axios from "axios";


const baseURL = axios.create({
  baseURL: process.env.PEPSALES_BASEURL,
});


export default baseURL