import AddPostesSlice from "@/slices/postsSlice";
import DashboardSlice  from "@/slices/dashoardSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        posts: AddPostesSlice,
        dashboardSlice : DashboardSlice 
    }
})

export type RootState = ReturnType<typeof store.getState>