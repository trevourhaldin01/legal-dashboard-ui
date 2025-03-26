import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchMockCases } from "@/lib/services/caseService";

import { Case } from "@/lib/types";

interface CasesState{
    cases: Case[]
    loading:boolean
    error: string | null
};

const initialState:CasesState = {
    cases:[],
    loading:false,
    error:null
};

export const fetchCases = createAsyncThunk("cases/fetchCases", async()=>{
    const response = await fetchMockCases();
   
    return response;
});

const caseSlice  = createSlice({
    name:"cases",
    initialState,
    reducers:{
        addCase: (state, action: PayloadAction<Case>) => {
            state.cases.push(action.payload);
          },
          updateCase: (state, action: PayloadAction<Case>) => {
            const index = state.cases.findIndex((caseIndex) => caseIndex.id === action.payload.id);
            if (index !== -1) {
              state.cases[index] = { ...state.cases[index], ...action.payload };
            }
          },
          deleteCase: (state, action: PayloadAction<number>) => {
            state.cases = state.cases.filter((casesIndex) => casesIndex.id !== action.payload);
          },
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchCases.pending, (state)=>{
                state.loading = true;
                state.error= null;
            })
            .addCase(fetchCases.fulfilled, (state, action)=>{
                state.loading = false;
                state.cases  = action.payload;
            })
            .addCase(fetchCases.rejected, (state, action)=>{
                state.loading = false;
                state.error  = action.error.message || "Failed to load cases"
            })

    }
});
export const {addCase, updateCase, deleteCase} = caseSlice.actions;
export default caseSlice.reducer;