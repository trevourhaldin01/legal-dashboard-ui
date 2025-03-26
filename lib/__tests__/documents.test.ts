import { configureStore } from "@reduxjs/toolkit"
import documentsReducer, { fetchRecentDocuments } from "../store/documents/documentsSlice"
import { fetchRecentMockDocuments } from "../services/documentsService"
import { RootState } from "../store/store"

// Mock the service
jest.mock("../services/documentsService")

describe("documents reducer", () => {
  let store: ReturnType<typeof configureStore>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        documents: documentsReducer,
      },
    })
  })

  it("should handle initial state", () => {
    expect((store.getState() as RootState).documents).toEqual({
      documents: [],
      loading: false,
      error: null,
    })
  })

  it("should handle successful fetch", async () => {
    const mockData = [
      {
        id: 1,
        title: "Test Document",
        version: "1.0",
        updatedAt: "Today",
        updatedBy: "Test User",
      },
    ]

    // Mock the API response
    ;(fetchRecentMockDocuments as jest.Mock).mockResolvedValue(mockData)

    await store.dispatch(fetchRecentDocuments()as any)

    expect((store.getState() as RootState).documents.loading).toBe(false)
    expect((store.getState() as RootState).documents.documents).toEqual(mockData)
    expect((store.getState() as RootState).documents.error).toBe(null)
  })
})

