import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"

import { configureStore } from "@reduxjs/toolkit"
import { useRouter } from "next/navigation"
import authReducer from "../store/auth/authSlice"
import SettingsPage from "@/app/dashboard/settings/page"
import '@testing-library/jest-dom';
import { Reducer } from "@reduxjs/toolkit"
import { Store } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"



// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

const renderWithStore = (preloadedState: any) => {
const rootReducer = combineReducers({
    auth: authReducer,
    });
    
    const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    });

//   return render(
//     <Provider store={store}>
//       <SettingsPage />
//     </Provider>
//   )
}

describe("SettingsPage", () => {
  it("redirects non-admin users to /dashboard", () => {
    const pushMock = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ push: pushMock })

    renderWithStore({ auth: { role: "user" } })

    expect(pushMock).toHaveBeenCalledWith("/dashboard")
  })

  it("renders settings page for admin users", () => {
    renderWithStore({ auth: { role: "admin" } })

    expect(screen.getByText("Settings")).toBeInTheDocument()
    expect(screen.getByText("Manage your system settings and preferences.")).toBeInTheDocument()
  })

  it("updates form inputs correctly", () => {
    renderWithStore({ auth: { role: "admin" } })

    const input = screen.getByLabelText("Practice Name") as HTMLInputElement
    fireEvent.change(input, { target: { value: "New Legal Firm" } })

    expect(input.value).toBe("New Legal Firm")
  })
})
