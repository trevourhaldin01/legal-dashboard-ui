"use client";

import CasesSummaryWidget from "@/components/dashboard/cases-summary-widget";
import { RecentDocumentsWidget } from "@/components/dashboard/recent-documents-widget";
import { TimeTrackingWidget } from "@/components/dashboard/time-tracking-widget";
import { fetchCases } from "@/lib/store/cases/casesSlice";
import { fetchRecentDocuments } from "@/lib/store/documents/documentsSlice";
import { fetchTimeTracking } from "@/lib/store/timeTracking/timeTrackingSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function DashboardPage(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCases() as any);
        dispatch(fetchRecentDocuments() as any);
        dispatch(fetchTimeTracking() as any);
    })
    return (
        <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CasesSummaryWidget />
            <RecentDocumentsWidget />
            <TimeTrackingWidget />


        </div>
    )
}