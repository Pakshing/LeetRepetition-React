import { userSlice } from '../store/features/user/UserSlice'
import { questionTableSlice } from '../store/features/questionTable/questionTableSlice'
import { configureStore } from "@reduxjs/toolkit";
import { tokenSlice} from '../store/features/token/tokenSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    questionTableStore: questionTableSlice.reducer,
    tokenStore: tokenSlice.reducer
    
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;