import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMockCases } from "@/lib/services/caseService";

interface Case {
    id:string
    name:string
    description:string
    status:string
};

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
    reducers:{},
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

export default caseSlice.reducer;