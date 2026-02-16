import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token=localStorage.getItem("token");
const user=token ? jwtDecode(token):null;

const authSlice=createSlice({
    name:"auth",
    initialState:{
        token:token||null,
        user:user,
    },
    reducers:{
        loginUserAction:(state,action)=>{
            state.token=action.payload.token;
            state.user=jwtDecode(action.payload.token);
            localStorage.setItem("token",action.payload.token);
        },
        logoutAction:(state)=>{
            state.token=null;
            state.user=null;
            localStorage.removeItem("token");
        },
    },
});

export const{loginUserAction,logoutAction}=authSlice.actions;
export default authSlice.reducer;