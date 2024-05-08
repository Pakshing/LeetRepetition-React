import { LeetCodeQuestionModel } from '../../../data/LeetCodeQuestionModel';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import Cookies from 'js-cookie';


const backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080';

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

export const fetchQuestions = createAsyncThunk(
  'questions/find',
  async (thunkAPI) => {
    const response = await axios.get(backendHost+'/api/v1/questions/find', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get("token")}`
      }
    });
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
        builder.addCase(fetchQuestions.pending, (state) => {
          state.loading = "pending";
        });
        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
          state.loading = "succeeded";
          state.questions = action.payload;
        });
        builder.addCase(fetchQuestions.rejected, (state, action) => {
          state.loading = "failed";
          state.questions = [];
          state.error = action.payload as string;
        });
    }
});




