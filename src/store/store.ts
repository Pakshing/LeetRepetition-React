import { userSlice } from './features/user/UserSlice'
import { questionTableSlice } from './features/questionTable/questionTableSlice'
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    questionTable: questionTableSlice.reducer
    
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;