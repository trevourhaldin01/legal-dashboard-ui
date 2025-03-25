// Mock API service for document data

export async function fetchRecentMockDocuments() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200))
  
    // Randomly fail 10% of the time to demonstrate error handling
    if (Math.random() < 0.1) {
      throw new Error("Failed to fetch recent documents")
    }
  
    return [
      {
        id: "doc-1",
        title: "Smith vs. Johnson - Settlement Agreement",
        version: "2.3-FINAL",
        updatedAt: "2 hours ago",
        updatedBy: "Jane Smith",
      },
      {
        id: "doc-2",
        title: "Trademark Application - TechCorp",
        version: "1.2",
        updatedAt: "Yesterday",
        updatedBy: "Michael Johnson",
      },
      {
        id: "doc-3",
        title: "Real Estate Purchase Agreement",
        version: "3.1-FINAL",
        updatedAt: "2 days ago",
        updatedBy: "Sarah Williams",
      },
      {
        id: "doc-4",
        title: "Corporate Bylaws - Acme Inc.",
        version: "1.0",
        updatedAt: "3 days ago",
        updatedBy: "Robert Davis",
      },
    ]
  }
  
  