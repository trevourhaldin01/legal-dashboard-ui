"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store/store"
import { FileText, Filter, Plus, Search,AlertCircle, Pencil, Trash } from "lucide-react"
import { useDispatch } from "react-redux"
import DocumentModal from "@/components/modals/DocumetModal"
import { Document } from "@/lib/types"
import { deleteDocument, fetchRecentDocuments } from "@/lib/store/documents/documentsSlice"

export default function DocumentsPage() {
  const { role } = useSelector((state: RootState) => state.auth);
  const {documents, loading, error} = useSelector((state:RootState)=>state.documents);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)

  if(error){
    return (
        <div className="w-full  border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center justify-center h-32 text-red-500">
              <AlertCircle className="h-8 w-8 mr-2"  />
              <span>Failed to load documents</span>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => dispatch(fetchRecentDocuments() as any)} // Dispatch the fetchRecentDocuments action to reload data
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
              >
                Retry Loading Documents
              </button>
            </div>

        </div>
    )
  }

  // Filter documents based on search query
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.updatedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div className="space-y-6 p-6">
      <DocumentModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} editingDocument={editingDocument} documents={documents} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-gray-500">Manage and organize all legal documents in one place.</p>
        </div>
        <button 
          onClick={() => {
            setEditingDocument(null)
            setModalOpen(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
        >
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
                <th className="p-3">Actions</th>
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
                    <td className="p-3 flex gap-2">
                      <button onClick={() => { setEditingDocument(doc); setModalOpen(true); }} className="text-green-600 cursor-pointer"><Pencil /></button>
                      {role === "admin" && (
                        <button
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this document?")) {
                              dispatch(deleteDocument(doc.id))
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
              As an administrator, you have access to document retention policies, permission management, and document
              template creation tools.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
