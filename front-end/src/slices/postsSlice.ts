import { AccountTypes, AddPosteTypes, reducerPosts } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: reducerPosts = {
    cardsPost: false,
    posts: [],
    loading: true,
    editePost: null,
    actions: null,
    active: false,
    following: [],
    usersLiked: [],
    showComments: null,
    actionsComments: null,
    showReplay: null,
    commentPost: '',
    replyComment: '',
    message: ''
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
        },
        setFollowing(state, action: PayloadAction<AccountTypes[]>) {
            state.following = action.payload
        },
        setUsersLiked(state, action: PayloadAction<AccountTypes[]>) {
            state.usersLiked = action.payload
        },
        setshowComments(state, action: PayloadAction<null | number>) {
            state.showComments = action.payload
        },
        setActionsComments(state, action: PayloadAction<null | number>) {
            state.actionsComments = action.payload
        },
        setShowReplay(state, action: PayloadAction<null | number>) {
            state.showReplay = action.payload
        },
        setCommentPost(state, action: PayloadAction<string>) {
            state.commentPost = action.payload
        },
        setReplyComment(state, action: PayloadAction<string>) {
            state.replyComment = action.payload
        },
        setMessage(state, action: PayloadAction<string>) {
            state.message = action.payload
        }
    }
});

export const {
    setCardsPost, setPosts, setLoading, setEditePost,
    setActions, setActive, setFollowing, setUsersLiked,
    setshowComments, setActionsComments, setShowReplay,
    setCommentPost, setReplyComment, setMessage
} = PostsSlice.actions;
export default PostsSlice.reducer;