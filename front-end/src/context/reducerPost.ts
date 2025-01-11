import { reducerPosts } from "@/types";

const initialState: reducerPosts = {
    cardsPost: false,
    posts: [],
    isPostReady: false,
    loading: true,
    editePost: null,
    actions: null,
    active: false
}

const newReducer = (state: reducerPosts, action: any): reducerPosts => {
    switch (action.type) {
        case 'SET_CardsPost':
            return { ...state, cardsPost: action.payload };
        case 'SET_Posts':
            return { ...state, posts: action.payload };
        case 'SET_IsPostReady':
            return { ...state, isPostReady: action.payload };
        case 'SET_Loading':
            return { ...state, loading: action.payload };
        case 'SET_EditePost':
            return { ...state, editePost: action.payload };
        case 'SET_Actions':
            return { ...state, actions: action.payload };
        case 'SET_Active':
            return { ...state, active: action.payload };
        default:
            return state;
    }
}

export { newReducer, initialState }