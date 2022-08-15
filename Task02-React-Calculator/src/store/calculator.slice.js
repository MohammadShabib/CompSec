import { createSlice } from "@reduxjs/toolkit";

const calculator = createSlice({
    name: "calculator",
    initialState: {
        val: "",
    },
    reducers: {
        setValue(state, action) {
            state.val = action.payload.val;
        },
    },
});

export const calculatorActions = calculator.actions;

export default calculator;
