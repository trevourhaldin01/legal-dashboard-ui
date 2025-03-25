import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchMockTimeTracking } from "@/lib/services/timeTrackingService"

interface TimeEntry {
  id: string
  name: string
  role: string
  hours: number
}

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
  reducers: {},
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

export default timeTrackingSlice.reducer;

