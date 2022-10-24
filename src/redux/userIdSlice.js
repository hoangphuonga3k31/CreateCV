import { createSlice } from "@reduxjs/toolkit";

export const userIdSlice = createSlice({
    name: 'userId',
    initialState: {
        id: "a",
    },
    reducers: {
        updateUserId: (state, action) => {
            state.id = action.payload
        }
    }
})

export const { updateUserId } = userIdSlice.actions;

export default userIdSlice.reducer