

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const backendHost = process.env.BACKEND_HOST || 'http://localhost:8080';

export const fetchQuestion = async () => {
    const response = await axios.get(`${backendHost}/questions`);
    return response.data;
};
