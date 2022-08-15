import { configureStore } from "@reduxjs/toolkit";
import calculator from "./calculator.slice";
const store = configureStore({
    reducer: calculator.reducer,
});
export default store;
