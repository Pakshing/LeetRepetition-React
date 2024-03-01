import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state interface
interface QuestionTableState {
    // Define your initial state properties here
}

// Define the initial state
const initialState: QuestionTableState = {
    // Set your initial state values here
};

// Create the slice
const questionTableSlice = createSlice({
    name: 'questionTable',
    initialState,
    reducers: {
        // Define your actions and reducers here
    },
});

// Export the actions and reducer
export const { actions, reducer } = questionTableSlice;
