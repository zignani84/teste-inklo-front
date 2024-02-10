import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/api' // Substitua pela URL da sua API PHP http://localhost:8080/api
});

export default api;
