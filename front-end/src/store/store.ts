import AddPostesSlice from "@/slices/postsSlice";
import DashboardSlice  from "@/slices/dashoardSlice";
import SignInSlice from "@/slices/signinSlice";
import SignUpSlice from "@/slices/signupSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        signup: SignUpSlice,
        signin: SignInSlice,
        posts: AddPostesSlice,
        dashboardSlice : DashboardSlice 
    }
})

export type RootState = ReturnType<typeof store.getState>