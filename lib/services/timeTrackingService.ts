

export async function fetchMockTimeTracking() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Randomly fail 10% of the time to demonstrate error handling
    if (Math.random() < 0.1) {
      throw new Error("Failed to fetch time tracking data")
    }
  
    return [
      {
        id: 1,
        name: "Jane Smith",
        role: "Senior Partner",
        hours: 32.5,
      },
      {
        id: 2,
        name: "Michael Johnson",
        role: "Associate",
        hours: 45.2,
      },
      {
        id: 3,
        name: "Sarah Williams",
        role: "Partner",
        hours: 28.7,
      },
      {
        id: 4,
        name: "Robert Davis",
        role: "Junior Associate",
        hours: 52.1,
      },
    ]
  }
  
  