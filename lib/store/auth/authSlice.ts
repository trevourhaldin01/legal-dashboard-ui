import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState  {
    isAuthenticated: boolean
    email: string
    role: "admin" | "user" | null
}

const initialState : AuthState = {
    isAuthenticated: false,
    email:"",
    role: null
};

const authSlice  = createSlice({
    name:"auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{email:string, role:"admin" | "user"}>)=>{
            state.isAuthenticated=true;
            state.email=action.payload.email;
            state.role= action.payload.role;
        },
        logout:(state)=>{
            state.isAuthenticated=false;
            state.email="";
            state.role=null;
        }
    }

});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;