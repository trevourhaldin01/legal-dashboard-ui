import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchRecentMockDocuments } from "@/lib/services/documentsService"

interface Document {
  id: string
  title: string
  version: string
  updatedAt: string
  updatedBy: string
}

interface DocumentsState {
  documents: Document[]
  loading: boolean
  error: string | null
}

const initialState: DocumentsState = {
  documents: [],
  loading: false,
  error: null,
}

export const fetchRecentDocuments = createAsyncThunk("documents/fetchRecentDocuments", async () => {
  const response = await fetchRecentMockDocuments()
  return response
})

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentDocuments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRecentDocuments.fulfilled, (state, action) => {
        state.loading = false
        state.documents = action.payload
      })
      .addCase(fetchRecentDocuments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch documents"
      })
  },
})

export default documentsSlice.reducer

