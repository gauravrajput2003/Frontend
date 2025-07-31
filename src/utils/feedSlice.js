import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            console.log("Adding feed to Redux:", action.payload?.length || 0, "users");
            return action.payload;
        },
        removeUserFeed: (state, action) => {
            if (!state || !Array.isArray(state)) {
                console.log("State is not an array, returning current state");
                return state;
            }
            
            console.log("Removing user with ID:", action.payload);
            const newFeed = state.filter((user) => user._id !== action.payload);
            console.log("Feed length after removal:", newFeed.length);
            
            return newFeed;
        },
        clearFeed: (state) => {
            console.log("Clearing feed");
            return null;
        }
    },
})

export const { addFeed, removeUserFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;