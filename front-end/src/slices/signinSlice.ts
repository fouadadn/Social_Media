import { AccountTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AccountTypes = {
    Email: '',
    Password: '',
}

export const SignInSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        setEmail(state: AccountTypes, action: PayloadAction<string>) {
            state.Email = action.payload
        },
        setPassword(state: AccountTypes, action: PayloadAction<string>) {
            state.Password = action.payload
        }
    }
});

export const { setEmail, setPassword } = SignInSlice.actions;
export default SignInSlice.reducer