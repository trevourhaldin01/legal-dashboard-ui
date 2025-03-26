"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/store/store"

import { addTimeEntry, updateTimeEntry } from "@/lib/store/timeTracking/timeTrackingSlice"



export default function TimeEntryModal({ isOpen, onClose, editingEntry, entries }: any) {
  const dispatch = useDispatch()
  const { email,role } = useSelector((state: RootState) => state.auth) // Get logged-in user email
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    role: "",
    hours: 0,
  })

  useEffect(() => {
    if (editingEntry) {
      setFormData(editingEntry) // Pre-fill for editing
    } else {
      // Find the highest existing numeric ID
      const highestId = entries
        ?.map((entry: any) => entry.id) 
        .reduce((max: number, num: number) => (num > max ? num : max), 0)
      console.log({highestId})
      setFormData({
        id: highestId + 1, // Increment ID
        name: "",
        role:"",
        hours:0,
      })
    }
  }, [editingEntry, entries, email])

  const handleChange = (e: any) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [e.target.name]: e.target.name === "hours" ? Number(e.target.value) : e.target.value, // Ensure hours is stored as a number
    }))
    console.log({formData})
  }

  const handleSubmit = () => {
    if(role=== "admin"){
        if (editingEntry) {
            dispatch(updateTimeEntry({ ...formData, }))
        } else {
            dispatch(addTimeEntry({ ...formData }))

    }
    onClose()
    }
 }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{editingEntry ? "Edit Time Entry" : "New Time Entry"}</h2>

        <div className="space-y-4">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label>Role</label>
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label>Hours</label>
            <input 
              type="number"
              name="hours"
              placeholder="Hours"
              value={formData.hours}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>
          
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editingEntry ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
