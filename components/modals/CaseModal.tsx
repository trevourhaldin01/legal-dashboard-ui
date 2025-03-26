"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/store/store"
import { addDocument, updateDocument } from "@/lib/store/documents/documentsSlice"
import { addCase, updateCase } from "@/lib/store/cases/casesSlice"



export default function CaseModal({ isOpen, onClose, editingCase, cases }: any) {
  const dispatch = useDispatch()
  const { email } = useSelector((state: RootState) => state.auth) // Get logged-in user email
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
    status: "",
  })

  useEffect(() => {
    if (editingCase) {
      setFormData(editingCase) // Pre-fill for editing
    } else {
      // Find the highest existing numeric ID
      const highestId = cases
        ?.map((doc: any) => doc.id)
        .reduce((max: number, num: number) => (num > max ? num : max), 0)

      setFormData({
        id: highestId + 1, // Increment ID
        name: "",
        description:"",
        status: "",
      })
    }
  }, [editingCase, cases, email])

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (editingCase) {
        dispatch(updateCase(formData))
    } else {
        
        dispatch(
            addCase(formData)
        )
    }
    onClose();
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{editingCase ? "Edit Case" : "New Case"}</h2>

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
                <label>Description</label>
                <textarea
                    rows={5}
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label>Status</label>
                
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>select status</option>
                    <option  value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>

                </select>
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
              {editingCase ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
