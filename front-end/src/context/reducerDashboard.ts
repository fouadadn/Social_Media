import { reducerDashoard } from "@/types";

const initialState: reducerDashoard = {
    loading: true,
    cardsPost: false,
    actions: null,
    posts: [],
    editePost: null,
}

const reducer = (state: reducerDashoard, action: any): reducerDashoard => {
    switch (action.type) {
        case 'SET_Loading':
            return { ...state, loading: action.payload };
        case 'SET_CardsPost':
            return { ...state, cardsPost: action.payload };
        case 'SET_Actions':
            return { ...state, actions: action.payload };
        case 'SET_Posts':
            return { ...state, posts: action.payload };
        case 'SET_EditePost':
            return { ...state, editePost: action.payload };
        default:
            return state;
    }
}

export { reducer, initialState }