"use client";

import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";
import { AlertCircle,Plus,Clock, Calendar,Filter, Search } from "lucide-react";
import { useState } from "react";

export default function TimeTrackingPage(){
    const {role} = useSelector((state:RootState)=>state.auth);
    const {data,loading,error} = useSelector((state:RootState)=>state.timeTracking);

    const [searchQuery, setSearchQuery] = useState("");

    // Filter time entries based on search query
    const filteredEntries = data.filter(
        (entry) =>
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.role.toLowerCase().includes(searchQuery.toLowerCase())
        
    )

  // Calculate totals
  const totalHours = filteredEntries.reduce((sum, entry) => sum + entry.hours, 0)
  const totalBillable = filteredEntries.reduce((sum, entry) => sum + entry.hours * 250, 0) //assumed a rate of 250$

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

    if(error){
        return (
            <div className="w-full  border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <div className="flex items-center justify-center h-32 text-red-500">
                  <AlertCircle className="h-8 w-8 mr-2"  />
                  <span>Failed to load tracking data</span>
                </div>
    
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Time Tracking</h1>
                    <p className="text-muted-foreground">Track and manage billable hours.</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
                    <Plus className="h-4 w-4" /> New Time Entry
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="pb-2">
                        <h3 className="text-sm font-medium text-gray-700">Total Hours</h3>
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                        <div className="text-2xl font-bold">{totalHours.toFixed(1)}</div>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="pb-2">
                    <h3 className="text-sm font-medium text-gray-700">Billable Amount</h3>
                    </div>
                    <div className="text-2xl font-bold">${totalBillable.toLocaleString()}</div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="pb-2">
                        <h3 className="text-sm font-medium text-gray-700">Current Week</h3>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        <div className="text-lg font-medium">March 1 - March 31, 2025</div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Time Entries</h2>
                <p className="text-gray-500 mb-4">View and manage all your time entries</p>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                        type="search"
                        placeholder="Search time entries..."
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
                                    <th className="p-3 hidden md:table-cell">Role</th>
                                    <th className="p-3 ">Hours</th>
                                    <th className="p-3 hidden md:table-cell">Billable Amount</th>

                                </tr>
                            </thead>
                            <tbody>
                                {filteredEntries.length === 0?(
                                    <tr>
                                        <td colSpan={5} className="text-center py-6 text-gray-700">
                                            No time entries found. Try adjusting your search.
                                        </td>
                                    </tr>

                                ):(
                                    filteredEntries.map((entry)=>(
                                        <tr key={entry.id} className="border-t border-gray-300 hover:bg-gray-50">
                                            <td className="p-3 flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 mr-3">
                                                    {getInitials(entry.name)}
                                                </div>
                                                <span className="font-medium">{entry.name}</span>
                                            </td>
                                            <td className="p-3 hidden md:table-cell">{entry.role}</td>
                                            <td className="p-3 l">{entry.hours}</td>
                                            <td className="p-3 hidden md:table-cell">${entry.hours *250}</td>

                                        </tr>
                                    ))

                                )}
                            </tbody>
                        </table>
                    </div>
                
            </div>


        </div>

    )
}