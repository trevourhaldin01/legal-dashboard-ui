"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store/store"

export default function SettingsPage() {
  const { role } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (role !== "admin") {
      router.push("/dashboard")
    }
  }, [role, router])

  if (role !== "admin") {
    return null
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your system settings and preferences.</p>
      </div>

      <div className="flex space-x-4 border-b pb-4">
        <button className="px-4 py-2 text-gray-700 border-b-2 border-blue-500 font-medium">General</button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700">Users & Permissions</button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700">Billing Rates</button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700">Integrations</button>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Practice Information</h2>
          <p className="text-gray-500 text-sm">Update your practice details and contact information.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium">Practice Name</label>
              <input className="mt-1 block w-full border p-2 rounded-lg" defaultValue="LegalTech Associates" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <input className="mt-1 block w-full border p-2 rounded-lg" defaultValue="contact@legaltech.com" />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input className="mt-1 block w-full border p-2 rounded-lg" defaultValue="(256) 780228565" />
            </div>
            <div>
              <label className="block text-sm font-medium">Website</label>
              <input className="mt-1 block w-full border p-2 rounded-lg" defaultValue="https://legaltech.com" />
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Save Changes</button>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold">System Preferences</h2>
          <p className="text-gray-500 text-sm">Configure system-wide settings and defaults.</p>
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <span>Enable Two-Factor Authentication</span>
              <input type="checkbox" className="w-6 h-6" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Automatic Conflict Checking</span>
              <input type="checkbox" className="w-6 h-6" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Document Version Control</span>
              <input type="checkbox" className="w-6 h-6" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input type="checkbox" className="w-6 h-6" defaultChecked />
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Save Preferences</button>
        </div>
      </div>
    </div>
  )
}
