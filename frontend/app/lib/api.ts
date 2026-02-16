import axios from "axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

console.log(BACKEND_URL)

export const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});