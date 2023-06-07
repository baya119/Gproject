import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Specify the base URL for all requests
    headers: {
      Authorization: localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null, 
      'Content-Type': 'application/json', 
      Accept: 'application/json',
    },
  });

export default instance;