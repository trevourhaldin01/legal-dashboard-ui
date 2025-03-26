"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store/store"
import { FileText, Filter, Plus, Search,AlertCircle, Pencil, Trash } from "lucide-react"
import { useDispatch } from "react-redux"
import { Case } from "@/lib/types"
import { deleteCase, fetchCases } from "@/lib/store/cases/casesSlice"
import CaseModal from "@/components/modals/CaseModal"

export default function CasesPage() {
  const { role } = useSelector((state: RootState) => state.auth);
  const {cases, error} = useSelector((state:RootState)=>state.cases);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false)
  const [editingCase, setEditingCase] = useState<Case | null>(null)

  if(error){
    return (
        <div className="w-full  border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center justify-center h-32 text-red-500">
              <AlertCircle className="h-8 w-8 mr-2"  />
              <span>Failed to load cases</span>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => dispatch(fetchCases() as any)} // Dispatch the fetchCases action to reload data
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
              >
                Retry Loading cases
              </button>
            </div>

        </div>
    )
  }

  // Filter cases based on search query
  const filteredCases = cases.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())||
      doc.status.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div className="space-y-6 p-6">
      <CaseModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} editingCase={editingCase} cases={cases} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Cases</h1>
          <p className="text-gray-500">Manage and organize all legal cases.</p>
        </div>
        <button 
          onClick={() => {
            setEditingCase(null)
            setModalOpen(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> New Case
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Cases Library</h2>
        <p className="text-gray-500 mb-4">Browse, search, and manage all your cases.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search cases..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-2xl">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Name</th>
                
                <th className="p-3 hidden md:table-cell">Description</th>
                <th className="p-3 hidden sm:table-cell">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-700">
                    No cases found. Try adjusting your search.
                  </td>
                </tr>
              ) : (
                filteredCases.map((doc) => (
                  <tr key={doc.id} className="border-t border-gray-300 hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">{doc.name}</span>
                    </td>
                    
                    <td className="p-3 hidden md:table-cell">{doc.description}</td>
                   
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          doc.status === "active"
                            ? "bg-blue-100 text-blue-700"
                            : doc.status === "pending"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button onClick={() => { setEditingCase(doc); setModalOpen(true); }} className="text-green-600 cursor-pointer"><Pencil /></button>
                      {role === "admin" && (
                        <button
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this document?")) {
                              dispatch(deleteCase(doc.id))
                            }
                          }}
                          className="text-red-600 cursor-pointer"
                        >
                          <Trash />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {role === "admin" && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="font-medium mb-2">Admin Controls</h3>
            <p className="text-sm text-gray-600">
              As an administrator, you have access to case retention policies, permission management
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
