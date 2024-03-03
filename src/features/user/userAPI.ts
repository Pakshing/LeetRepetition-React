import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const backendHost = process.env.BACKEND_HOST || 'http://localhost:8080';

async function sendEmail(email:string) {
    try {
      const response = await axios.post(backendHost+'/user', {
        email: email
      });
  
      if (response.status === 200) {
        console.log('User created successfully');
        return 'Success';
      } else {
        console.error('User creation failed');
        return 'Failure';
      }
    } catch (error) {
      console.error(error);
      return 'Failure';
    }
  }