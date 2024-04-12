import { createAsyncThunk, createSlice,PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080';


interface TokenState {
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TokenState = {
    token : null,
    status: 'idle',
    error: null
};

interface GithubLoginResponse {
    token: string;
    message: string;
}

export const githubLogin = createAsyncThunk<GithubLoginResponse, string>('token/githubLogin', async (code, thunkAPI) => {
    try {
        const response = await axios.post(backendHost + '/api/v1/oauth2/github/authenticate', code);
        if (response.status === 200) {
            Cookies.set('token', response.data.token);
            console.log(response.data.message); 
            return response.data;
        } else {
            console.error('Authentication failed');
            return thunkAPI.rejectWithValue('Authentication failed');
        }
    } catch (error) {
        console.error('Error:', error);
        return thunkAPI.rejectWithValue('An error occurred');
    }
});
// Token slice
export const tokenSlice = createSlice({
    name: 'token',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(githubLogin.fulfilled, (state, action: PayloadAction<GithubLoginResponse>) => {
                state.token = action.payload.token;
                console.log("token fulfilled",state.token)
            })
            .addCase(githubLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(githubLogin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export default tokenSlice.reducer;