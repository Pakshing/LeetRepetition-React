import { LeetCodeQuestionModel } from '../../../data/LeetCodeQuestionModel';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';


const backendHost = process.env.BACKEND_HOST || 'http://localhost:8080';

// Define the initial state interface
interface QuestionTableState {
    // Define your initial state properties here
    tab: "All"|"Today"|"Week";
    loading: "idle"|"pending"|"succeeded"|"failed";
    questions: LeetCodeQuestionModel[];
    deck_id: number | null;
    error: string
}

// Define the initial state
const initialState: QuestionTableState = {
    // Set your initial state values here
    tab: "All",
    loading: "idle",
    questions: [],
    deck_id: null,
    error: ""

};

export const fetchQuetions = createAsyncThunk('questions/fetch', async (thunkAPI) => {
    let config = {
        method: 'get',
        url: backendHost+'/api/v1/questions/get',
    };
    const response = await axios.request(config)
    return response.data;
}
)

// Create the slice
export const questionTableSlice = createSlice({
    name: 'questionTable',
    initialState,
    reducers: {

        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuetions.pending, (state) => {
          state.loading = "pending";
        });
        builder.addCase(fetchQuetions.fulfilled, (state, action) => {
          state.loading = "succeeded";
          state.questions = action.payload;
        });
        builder.addCase(fetchQuetions.rejected, (state, action) => {
          state.loading = "failed";
          state.questions = [];
          state.error = action.payload as string;
        });
    }
});

// Export the actions and reducer
export const { actions, reducer } = questionTableSlice;

