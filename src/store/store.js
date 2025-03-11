import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"; //imported the reducer from authSlice
import mailReducer from "./slice/mailSlice"; //imported the reducer from mailSlice

export const store = configureStore({ //In configureStore we pass slice
    reducer: {
        // Adding reducers here
        auth : authReducer,  // this(auth) name of this slice can be used anywhere wherever needed.
        mail : mailReducer,
    }
});