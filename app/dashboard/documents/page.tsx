"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store/store"
import { FileText, Filter, Plus, Search,AlertCircle } from "lucide-react"

export default function DocumentsPage() {
  const { role } = useSelector((state: RootState) => state.auth);
  const {documents, loading, error} = useSelector((state:RootState)=>state.documents);
  const [searchQuery, setSearchQuery] = useState("");

  if(error){
    return (
        <div className="w-full  border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center justify-center h-32 text-red-500">
              <AlertCircle className="h-8 w-8 mr-2"  />
              <span>Failed to load documents</span>
            </div>

        </div>
    )
  }

  // Mock document data
//   const documents = [
//     {
//       id: "doc-1",
//       title: "Smith vs. Johnson - Settlement Agreement",
//       type: "Settlement",
//       version: "2.3-FINAL",
//       updatedAt: "2023-05-15",
//       updatedBy: "Jane Smith",
//       status: "Final",
//     },
//     {
//       id: "doc-2",
//       title: "Trademark Application - TechCorp",
//       type: "Application",
//       version: "1.2",
//       updatedAt: "2023-05-10",
//       updatedBy: "Michael Johnson",
//       status: "Draft",
//     },
//   ]

  // Filter documents based on search query
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.updatedBy.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-gray-500">Manage and organize all legal documents in one place.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New Document
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Document Library</h2>
        <p className="text-gray-500 mb-4">Browse, search, and manage all your legal documents.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search documents..."
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
                <th className="p-3">Title</th>
                
                <th className="p-3 hidden md:table-cell">Last Updated</th>
                <th className="p-3 hidden sm:table-cell">Updated By</th>
                <th className="p-3">Version</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-700">
                    No documents found. Try adjusting your search.
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="border-t border-gray-300 hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">{doc.title}</span>
                    </td>
                    
                    <td className="p-3 hidden md:table-cell">{doc.updatedAt}</td>
                    <td className="p-3 hidden sm:table-cell">{doc.updatedBy}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          doc.version.includes("FINAL")
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {doc.version}
                      </span>
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
              As an administrator, you have access to document retention policies, permission management, and document
              template creation tools.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
