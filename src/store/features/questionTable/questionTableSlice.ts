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

export const findQuestionByUserId = createAsyncThunk(
  'questions/find',
  async (owner_id: number, thunkAPI) => {
    const response = await axios.get('http://localhost:8080/api/v1/questions/find', {
      params: {
        owner_id: owner_id
      }
    });
    console.log(response.data)
    return response.data;
  }
);


// Create the slice
export const questionTableSlice = createSlice({
    name: 'questionTableSlice',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder.addCase(findQuestionByUserId.pending, (state) => {
          state.loading = "pending";
        });
        builder.addCase(findQuestionByUserId.fulfilled, (state, action) => {
          state.loading = "succeeded";
          state.questions = action.payload;
        });
        builder.addCase(findQuestionByUserId.rejected, (state, action) => {
          state.loading = "failed";
          state.questions = [];
          state.error = action.payload as string;
        });
    }
});




