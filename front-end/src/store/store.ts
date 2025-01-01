import AddPostesSlice from "@/slices/addposte";
import SignInSlice from "@/slices/signinSlice";
import SignUpSlice from "@/slices/signupSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        signup: SignUpSlice,
        signin: SignInSlice,
        addPostes: AddPostesSlice
    }
})