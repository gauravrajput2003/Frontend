import { createSlice } from "@reduxjs/toolkit";




const connectionslice=createSlice({
    name:"connection",
    initialState:null,
    reducers:{
        addConnection:(state,action)=>action.payload,
        removeconnection:()=>null,
    }
});
export const {addConnection,removeconnection}=connectionslice.actions;
export default connectionslice.reducer;