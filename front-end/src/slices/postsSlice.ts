import { AddPosteTypes, reducerPosts } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: reducerPosts = {
    cardsPost: false,
    posts: [],
    loading: true,
    editePost: null,
    actions: null,
    active: false
}

export const PostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setCardsPost(state, action: PayloadAction<boolean>) {
            state.cardsPost = action.payload
        },
        setPosts(state, action: PayloadAction<AddPosteTypes[]>) {
            state.posts = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setEditePost(state, action: PayloadAction<null | number>) {
            state.editePost = action.payload
        },
        setActions(state, action: PayloadAction<null | number>) {
            state.actions = action.payload
        },
        setActive(state, action: PayloadAction<boolean>) {
            state.active = action.payload
        }
    }
});

export const { setCardsPost, setPosts, setLoading, setEditePost, setActions, setActive } = PostsSlice.actions;
export default PostsSlice.reducer;