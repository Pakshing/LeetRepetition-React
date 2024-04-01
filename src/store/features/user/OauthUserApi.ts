import axios,{AxiosResponse} from 'axios';
import { createUser } from './UserSlice';
import { useAppDispatch } from '../../../app/store';

// ...

interface AccessTokenResponse {
  access_token: string;
  scope: string;
  token_type: string;
}

interface EmailResponse {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}

export async function getGithubUserEmail(code: string): Promise<string | undefined> {
  // Step 1: Exchange the code for an access token
  const tokenResponse: AxiosResponse<AccessTokenResponse> = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: process.env.REACT_APP_GITHUB_APP_ID,
    client_secret: process.env.REACT_APP_GITHUB_APP_SECRET,
    code: code,
  }, {
    headers: {
      'Accept': 'application/json'
    }
  });

  const accessToken = tokenResponse.data.access_token;

  // Step 2: Use the access token to get the user's email
  const userResponse: AxiosResponse<EmailResponse[]> = await axios.get('https://api.github.com/user/emails', {
    headers: {
      'Authorization': `token ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  // The response is an array of emails, find the primary one
  const primaryEmail = userResponse.data.find(email => email.primary)?.email;
  console.log("github primaryEmail",primaryEmail);
  return primaryEmail;
}

export async function fetchGoogleUserEmailByAccessToken(access_token: string): Promise<string> {
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const headers = {
      'Authorization': `Bearer ${access_token}`
    };
  
    try {
      const response = await axios.get(url, { headers: headers });
      console.log(response);
  
      if (response.data && response.data.email) {
        console.log("google",response.data.email);
        return response.data.email;
      }
    } catch (error) {
      console.error(error);
      alert('Failed to fetch email from Google');
    }
    return "Failure"
    
  }
