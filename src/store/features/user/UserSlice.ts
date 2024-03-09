// create a user slice.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    // define the state properties here
    id: number;
    email: string;
    dateCreated: Date;
    lastActive: Date;
    LoginMethod: string;
}

export const initialState: UserState = {
    // set initial state values here
    id: 0,
    email: "",
    dateCreated: new Date(),
    lastActive: new Date(),
    LoginMethod: ""
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            console.log( "Payload", action.payload)
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.dateCreated = action.payload.dateCreated;
            state.lastActive = action.payload.lastActive;
            state.LoginMethod = action.payload.LoginMethod;
        },

    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;