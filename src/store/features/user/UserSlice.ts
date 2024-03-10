import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { generate as randomStringGenerate } from 'randomstring';

const backendHost = process.env.BACKEND_HOST || 'http://localhost:8080';

interface UserState {
    user: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null
};

export const createUser = createAsyncThunk('user/create', async (_, thunkAPI) => {
    const user_email = randomStringGenerate(20) + "@localstorage.com";
    try {
        const response = await axios.post(backendHost + '/api/v1/users/add', {
            email: user_email
        });
        if (response.status === 201) {
            localStorage.setItem("user_email", user_email);
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("user_id", response.data.id.toString());
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
            return response.data;
        } else {
            return thunkAPI.rejectWithValue('User fetch failed');
        }
    } catch (error) {
        return thunkAPI.rejectWithValue('User fetch failed');
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