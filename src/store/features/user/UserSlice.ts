import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { generate as randomStringGenerate } from 'randomstring';
import { UserModel } from '../../../data/UserModel';
import { log } from 'console';

const backendHost = process.env.BACKEND_HOST || 'http://localhost:8080';

interface UserState {
    user: UserModel | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null
};

export const createUser = createAsyncThunk('user/', async ({email, loginMethod}:{email: string, loginMethod: string}, thunkAPI) => {
    console.log("createUser", email)
    console.log("createUser", loginMethod)
    email = email ==="" ? randomStringGenerate(20) + "@localstorage.com":email;
    loginMethod = loginMethod === "" ? "local":loginMethod;
    console.log("createUser", email)
    console.log("createUser", loginMethod)
    try {
        const response = await axios.post(backendHost + '/api/v1/users/add', {
            email: email,
            login_method: loginMethod
        });
        if (response.status >= 200) {
            console.log(response.data)
            localStorage.setItem("user_email", response.data.email);
            localStorage.setItem("user_id", response.data.id.toString());
            localStorage.setItem("login_method", response.data.login_method);
            return response.data;
        } else {
            return thunkAPI.rejectWithValue('User creation failed');
        }
    } catch (error) {
        return thunkAPI.rejectWithValue('User creation failed');
    }
});

export const getUser = createAsyncThunk('user/get', async (email: string, thunkAPI) => {
    try {
        const response = await axios.get(backendHost + '/api/v1/users/find', {
            params: {
                email: email
            }
        });
        if (response.status === 200) {
            localStorage.setItem("user_email", response.data.email);
            localStorage.setItem("user_id", response.data.id.toString());
            localStorage.setItem("login_method", response.data.login_method);
            console.log(response.data)
            return response.data;
        } else {
            return thunkAPI.rejectWithValue('User fetch failed');
        }
    } catch (error) {
        return thunkAPI.rejectWithValue('User fetch failed');
    }
});


export const getGithubUserEmailAndUser = createAsyncThunk('user/getGithubUserEmailAndUser', async (code: string, thunkAPI) => {
    try {
        // Call the Spring Boot backend route to get the user email
        const emailResponse = await axios.get(backendHost + '/github/oauth2/getUserEmail', {
            params: {
                code: code
            }
        });

        if (emailResponse.status === 200) {
            const email = emailResponse.data;
            // Call getUser() with the email
            const userResponse = await thunkAPI.dispatch(createUser({email: email, loginMethod: "GitHub"}));

            if (userResponse.type === getUser.fulfilled.type) {
                return userResponse.payload;
            } else {
                return thunkAPI.rejectWithValue('Failed to get user');
            }
        } else {
            return thunkAPI.rejectWithValue('Failed to get GitHub user email');
        }
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to get GitHub user email or user');
    }
});



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers:  (builder) => {
            builder.addCase(createUser.pending, (state) => {
                state.status = 'loading';
            })
            builder.addCase(createUser.fulfilled, (state, action) => {
                console.log("createUser fulfilled", action.payload)
                state.status = 'succeeded';
                state.user = action.payload;
            })
            builder.addCase(createUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            builder.addCase(getUser.pending, (state) => {
                state.status = 'loading';
            })
            builder.addCase(getUser.fulfilled, (state, action) => {
                console.log("getUser fulfilled", action.payload)
                state.status = 'succeeded';
                state.user = action.payload;
            })
            builder.addCase(getUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            
    }
});

export default userSlice.reducer;