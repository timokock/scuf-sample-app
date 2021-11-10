import axios from 'axios';
declare var API_BASE: string
const instance = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' }
});
export default instance;