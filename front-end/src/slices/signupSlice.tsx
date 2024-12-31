import { AccountTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AccountTypes = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    PasswordConfirmation: ''
}

export const SignUpSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setFirstName(state: AccountTypes, action: PayloadAction<string>) {
            state.FirstName = action.payload
        },
        setLastName(state: AccountTypes, action: PayloadAction<string>) {
            state.LastName = action.payload
        },
        setEmail(state: AccountTypes, action: PayloadAction<string>) {
            state.Email = action.payload
        },
        setPassword(state: AccountTypes, action: PayloadAction<string>) {
            state.Password = action.payload
        },
        setPasswordConfirmation(state: AccountTypes, action: PayloadAction<string>) {
            state.PasswordConfirmation = action.payload
        }
    }
});

export const { setFirstName, setLastName, setEmail, setPassword, setPasswordConfirmation } = SignUpSlice.actions;
export default SignUpSlice.reducer