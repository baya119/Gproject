import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Specify the base URL for all requests
    headers: {
      'Content-Type': 'application/json', // Set default headers (optional)
    },
  });

export default instance;