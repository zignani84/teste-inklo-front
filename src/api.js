import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.64.2:80/api' // Substitua pela URL da sua API PHP http://localhost ou 8085
});

export default api;
