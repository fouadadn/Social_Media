import { AddPosteTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AddPosteTypes = {
    title: '',
    body: ''
}

export const AddPostesSlice = createSlice({
    name: 'addPostes',
    initialState,
    reducers: {
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload
        },
        setBody(state, action: PayloadAction<string>) {
            state.body = action.payload
        }
    }
});

export const { setTitle, setBody } = AddPostesSlice.actions;
export default AddPostesSlice.reducer;