"use clients";

import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";
import { AlertCircle, Clock } from "lucide-react";
import Skeleton from "../ui/Skeleton";
import { fetchTimeTracking } from "@/lib/store/timeTracking/timeTrackingSlice";
import { useDispatch } from "react-redux";

export function TimeTrackingWidget(){
    const {data,loading,error} = useSelector((state:RootState)=>state.timeTracking);
    // console.log({data});
    const dispatch = useDispatch();

    if (error) {
        return (
          <div className="col-span-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="pb-2">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Time Tracking</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Error loading tracking data</p>
            </div>
            <div className="flex items-center justify-center h-32 text-red-500">
              <AlertCircle className="h-8 w-8 mr-2"  />
              <span>Failed to tracking data</span>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={() => dispatch(fetchTimeTracking() as any)} // Dispatch the fetchRecentDocuments action to reload data
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
                >
                    Retry loading tracking data
                </button>
            </div>
          </div>
        );
    };

    return (
        <div className="col-span-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="pb-2">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Time Tracking</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Billable hours by attorney</p>
            </div>
            <div className="">
            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                </div>
                ) : (
                    
                <div className="space-y-3">
                    {data.map((attorney) => (
                      <div
                        key={attorney.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md"
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 mr-3">
                            {attorney.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="font-medium">{attorney.name}</div>
                            <div className="text-xs ">{attorney.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-primary-foreground mr-1" />
                          <span className="font-medium">{attorney.hours} hrs</span>
                        </div>
                      </div>
                    ))}
                </div>
                    
                )}
            </div>
        </div>
    )
}