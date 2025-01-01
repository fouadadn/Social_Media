import { AddPosteTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AddPosteTypes = {
    Description: '',
    Picture: null
}

export const AddPostesSlice = createSlice({
    name: 'addPostes',
    initialState,
    reducers: {
        setDescription(state, action: PayloadAction<string>) {
            state.Description = action.payload
        },
        setPicture(state, action: PayloadAction<null>) {
            state.Picture = action.payload
        }
    }
});

export const { setDescription, setPicture } = AddPostesSlice.actions;
export default AddPostesSlice.reducer;