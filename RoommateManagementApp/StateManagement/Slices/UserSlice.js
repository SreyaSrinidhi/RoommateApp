import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 1
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setId: (state, action) => {
            console.log('Setting user ID to:', action.payload)
            state.id = action.payload;
        },
        logout: (state) => {
            state.id = null; // Reset user ID on logout
        }
    }
});

export const { setId, logout } = userSlice.actions;

export default userSlice.reducer;
