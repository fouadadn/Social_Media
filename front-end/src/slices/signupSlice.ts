import { AccountTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AccountTypes = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
}

export const SignUpSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setName(state: AccountTypes, action: PayloadAction<string>) {
            state.name = action.payload
        },
        setEmail(state: AccountTypes, action: PayloadAction<string>) {
            state.email = action.payload
        },
        setPassword(state: AccountTypes, action: PayloadAction<string>) {
            state.password = action.payload
        },
        setPasswordConfirmation(state: AccountTypes, action: PayloadAction<string>) {
            state.password_confirmation = action.payload
        }
    }
});

export const { setName, setEmail, setPassword, setPasswordConfirmation } = SignUpSlice.actions;
export default SignUpSlice.reducer