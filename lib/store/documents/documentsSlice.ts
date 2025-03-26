import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { fetchRecentMockDocuments } from "@/lib/services/documentsService"
import { Document } from "@/lib/types"


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
  reducers: {
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },
    updateDocument: (state, action: PayloadAction<Document>) => {
      const index = state.documents.findIndex((doc) => doc.id === action.payload.id);
      if (index !== -1) {
        state.documents[index] = { ...state.documents[index], ...action.payload };
      }
    },
    deleteDocument: (state, action: PayloadAction<number>) => {
      state.documents = state.documents.filter((doc) => doc.id !== action.payload);
    },
  },
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
});

export const { addDocument, updateDocument, deleteDocument } = documentsSlice.actions;

export default documentsSlice.reducer;

