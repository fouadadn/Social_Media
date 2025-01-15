import { AddPosteTypes, reducersTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: reducersTypes = {
    loading: true,
    cardsPost: false,
    actions: null,
    posts: [],
    editePost: null,
}

export const DashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {
        setLoading(state: reducersTypes, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setCardsPost(state: reducersTypes, action: PayloadAction<boolean>) {
            state.cardsPost = action.payload
        },
        setActions(state: reducersTypes, action: PayloadAction<null | number>) {
            state.actions = action.payload
        },
        setPosts(state: reducersTypes, action: PayloadAction<AddPosteTypes[]>) {
            state.posts = action.payload
        },
        setEditePost(state: reducersTypes, action: PayloadAction<null | number>) {
            state.editePost = action.payload
        },
    }
});

export const { setLoading, setCardsPost, setActions, setPosts, setEditePost } = DashboardSlice.actions;
export default DashboardSlice.reducer;
