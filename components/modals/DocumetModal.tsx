"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/store/store"
import { addDocument, updateDocument } from "@/lib/store/documents/documentsSlice"

function getFormattedDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
  
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
  
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays > 1) return `${diffDays} days ago`;
  
    return dateString; // Fallback for any edge case
  }
  

export default function DocumentModal({ isOpen, onClose, editingDocument, documents }: any) {
  const dispatch = useDispatch()
  const { email } = useSelector((state: RootState) => state.auth) // Get logged-in user email
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    version: "DRAFT",
    updatedBy: email, // Default to logged-in user
    updatedAt: "",
  })

  useEffect(() => {
    if (editingDocument) {
      setFormData(editingDocument) // Pre-fill for editing
    } else {
      // Find the highest existing numeric ID
      const highestId = documents
        ?.map((doc: any) => doc.id) 
        .reduce((max: number, num: number) => (num > max ? num : max), 0)

      setFormData({
        id: highestId + 1, // Increment ID
        title: "",
        version: "DRAFT",
        updatedBy: email,
        updatedAt: "",
      })
    }
  }, [editingDocument, documents, email])

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (editingDocument) {
        const currentDate = new Date().toISOString();
        const formattedUpdatedAt = getFormattedDate(currentDate);
        dispatch(updateDocument({ ...formData, updatedBy: email,updatedAt: formattedUpdatedAt }))
    } else {
        const currentDate = new Date().toISOString();
        const formattedUpdatedAt = getFormattedDate(currentDate);
        dispatch(
            addDocument({
            ...formData,
            updatedAt: formattedUpdatedAt,
            updatedBy: email,
            })
        )
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{editingDocument ? "Edit Document" : "New Document"}</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="version"
            placeholder="Version"
            value={formData.version}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="text-sm text-gray-600">Updated by: {email}</p>

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
              {editingDocument ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
