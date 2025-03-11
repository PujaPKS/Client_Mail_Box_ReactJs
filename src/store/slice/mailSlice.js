
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // initial state
    mails : [],
};

const mailSlice = createSlice({
    name: 'mail',
    initialState,
    reducers: {
        // reducers
        addMail(state, action) {
            state.mails.push(action.payload); // added mail to Redux Store
        },
    },
});

export const { addMail } = mailSlice.actions;

export default mailSlice.reducer;

// Redux only updates the state, while apiServices.js handles API logic.
