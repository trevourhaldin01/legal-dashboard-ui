"use client";

import { RootState } from "@/lib/store/store";
import { AlertCircle, CheckCircle, Clock, FileText } from "lucide-react";
import { useSelector } from "react-redux";
import Skeleton from "../ui/Skeleton";
import { fetchCases } from "@/lib/store/cases/casesSlice";
import { useDispatch } from "react-redux";

export default function  CasesSummaryWidget(){
    const {cases,loading, error} = useSelector((state:RootState)=>state.cases);
    // console.log({cases})
    const dispatch = useDispatch();

    // Summarizing cases based on status
    const summary = cases.reduce(
        (acc:{[key:string]:number}, caseItem) => {
        acc[caseItem.status] = (acc[caseItem.status] || 0) + 1;
        return acc;
        },
        { active: 0, pending: 0, closed: 0 } // Initial object with counts
    );
    console.log({summary})

    if (error) {
        return (
          <div className="col-span-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="pb-2">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Case Summary</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Error loading case data</p>
            </div>
            <div className="flex items-center justify-center h-32 text-red-500">
              <AlertCircle className="h-8 w-8 mr-2"  />
              <span>Failed to load case data</span>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={() => dispatch(fetchCases() as any)} // Dispatch the fetchCases action to reload data
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
                >
                    Retry loading cases
                </button>
            </div>
          </div>
        );
    };


      

    return (
        <div className="col-span-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="pb-2">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Case Summary</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Overview of your current cases</p>
            </div>
            <div className="">
            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
                ) : (
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="font-medium">Active Cases</span>
                    </div>
                    <span className="text-xl font-bold">{summary.active}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                    <div className="flex items-center">
                        <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                        <span className="font-medium">Pending Cases</span>
                    </div>
                    <span className="text-xl font-bold">{summary.pending}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="font-medium">Closed Cases</span>
                    </div>
                    <span className="text-xl font-bold">{summary.closed}</span>
                    </div>
                </div>
                )}
            </div>
        </div>
        
    )
}