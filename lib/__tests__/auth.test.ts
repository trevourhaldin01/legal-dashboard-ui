import authReducer, { login, logout } from "../store/auth/authSlice"

describe("auth reducer", () => {
  const initialState = {
    isAuthenticated: false,
    email: "",
    role: null,
  }

  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should handle login", () => {
    const actual = authReducer(initialState, login({ email: "test@example.com", role: "user" }))
    expect(actual.isAuthenticated).toEqual(true)
    expect(actual.email).toEqual("test@example.com")
    expect(actual.role).toEqual("user")
  })

  it("should handle logout", () => {
    const loggedInState = {
      isAuthenticated: true,
      email: "test@example.com",
      role: "user" as "admin" | "user" | null,
    }
    expect(authReducer(loggedInState, logout())).toEqual(initialState)
  })
})

