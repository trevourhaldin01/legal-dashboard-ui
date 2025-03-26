"use client";

import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";
import { AlertCircle, FileText } from "lucide-react";
import Skeleton from "../ui/Skeleton";
import { fetchRecentDocuments } from "@/lib/store/documents/documentsSlice";
import { useDispatch } from "react-redux";


export function RecentDocumentsWidget(){
    const {documents,loading,error} = useSelector((state:RootState)=> state.documents);
    // console.log({documents});
    const dispatch = useDispatch();
    if (error) {
        return (
          <div className="col-span-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="pb-2">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Documents</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Error loading documents</p>
            </div>
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
        );
    };
    return (
        <div className="col-span-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="pb-2">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Documents</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Latest documents with version info</p>
            </div>
            <div className=" ">
            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                </div>
                ) : (
                    <div className="space-y-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md"
                      >
                        <div className="flex items-start space-x-3">
                          <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div>
                            <div className="font-medium">{doc.title}</div>
                            <div className="text-xs text-muted-foreground">
                              Updated {doc.updatedAt} by {doc.updatedBy}
                            </div>
                          </div>
                        </div>
                        {/* <Badge variant={doc.version.includes("FINAL") ? "default" : "outline"}>v{doc.version}</Badge> */}
                        <span className={`inline-flex items-center rounded-3xl ${doc.version.includes("FINAL")?"bg-primary-foreground/80 text-white":" text-primary-muted-foreground bg-gray-50"}  px-2 py-1 text-xs font-medium  ring-1 ring-blue-700/10 ring-inset`}>
                            {doc.version}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
            </div>
        </div>

    )
}