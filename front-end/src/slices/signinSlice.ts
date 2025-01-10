import { AccountTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AccountTypes = {
    email: '',
    password: '',
}

export const SignInSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        setEmail(state: AccountTypes, action: PayloadAction<string>) {
            state.email = action.payload
        },
        setPassword(state: AccountTypes, action: PayloadAction<string>) {
            state.password = action.payload
        }
    }
});

export const { setEmail, setPassword } = SignInSlice.actions;
export default SignInSlice.reducer