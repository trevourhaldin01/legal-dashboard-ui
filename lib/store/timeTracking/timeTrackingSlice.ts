import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit"
import { fetchMockTimeTracking } from "@/lib/services/timeTrackingService"
import { TimeEntry } from "@/lib/types"


interface TimeTrackingState {
  data: TimeEntry[]
  loading: boolean
  error: string | null
}

const initialState: TimeTrackingState = {
  data: [],
  loading: false,
  error: null,
}

export const fetchTimeTracking = createAsyncThunk("timeTracking/fetchTimeTracking", async () => {
  const response = await fetchMockTimeTracking()
  return response
})

const timeTrackingSlice = createSlice({
  name: "timeTracking",
  initialState,
  reducers: {
    addTimeEntry: (state, action: PayloadAction<TimeEntry>) => {
      state.data.push(action.payload);
    },
    updateTimeEntry: (state, action: PayloadAction<TimeEntry>) => {
      const index = state.data.findIndex((entry) => entry.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
      }
    },
    deleteTimeEntry: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((entry) => entry.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeTracking.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTimeTracking.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchTimeTracking.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch time tracking data"
      })
  },
})

export const { addTimeEntry, updateTimeEntry, deleteTimeEntry } = timeTrackingSlice.actions;
export default timeTrackingSlice.reducer;

