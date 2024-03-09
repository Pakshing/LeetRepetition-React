import axios from 'axios';
import {setUser} from './UserSlice'
import { generate as randomStringGenerate} from 'randomstring'


const backendHost = process.env.BACKEND_HOST || 'http://localhost:8080';

export async function createUser() {
    const user_email = randomStringGenerate(20)+"@localstorage.com";
    try {
      const response = await axios.post(backendHost+'/api/v1/users/add', {
        email: user_email
      });
      if (response.status === 201) {
        console.log('User created successfully');
        localStorage.setItem("user_email",user_email)

        console.log(response.data)
        localStorage.setItem("user",JSON.stringify(response.data))
        localStorage.setItem("user_id",response.data.id)
        return response.data;
      } else {
        console.error('User creation failed');
        return 'Failure';
      }
    } catch (error) {
      console.error(error);
      return 'Failure';
    }
  }

  export async function getUser(email:string) {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/users/find', {
            params: {
              email: email
            }
          })
      if (response.status === 200) {
        console.log('User fetched successfully',response.data);
        // use UserSlice to set a user state
        // Assuming you have imported the UserSlice from your Redux store
        

        // Set the user state using the response data
        localStorage.setItem("user",JSON.stringify(response.data))
        setUser(response.data);
        localStorage.setItem("user_id",response.data.id)
        console.log(response.data)
        return response.data;
      } else {
        console.error('User fetch failed');
        return 'Failure';
      }
    } catch (error) {
      console.error(error);
      return 'Failure';
    }
  }