"use client";

import CasesSummaryWidget from "@/components/dashboard/cases-summary-widget";
import { RecentDocumentsWidget } from "@/components/dashboard/recent-documents-widget";
import { TimeTrackingWidget } from "@/components/dashboard/time-tracking-widget";
import { fetchCases } from "@/lib/store/cases/casesSlice";
import { fetchRecentDocuments } from "@/lib/store/documents/documentsSlice";
import { fetchTimeTracking } from "@/lib/store/timeTracking/timeTrackingSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store"; 

export default function DashboardPage() {
  const dispatch = useDispatch();

  // Access the state from Redux to check if data exists
  const cases = useSelector((state: RootState) => state.cases.cases);
  const documents = useSelector((state: RootState) => state.documents.documents);
  const timeTracking = useSelector((state: RootState) => state.timeTracking.data);

  useEffect(() => {
    // Only fetch if data does not exist
    if (!cases || cases.length === 0) {
      dispatch(fetchCases() as any); 
    }
    if (!documents || documents.length === 0) {
      dispatch(fetchRecentDocuments() as any); 
    }
    if (!timeTracking || timeTracking.length === 0) {
      dispatch(fetchTimeTracking() as any); 
    }
  }, [dispatch, cases, documents, timeTracking]); 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CasesSummaryWidget />
      <RecentDocumentsWidget />
      <TimeTrackingWidget />
    </div>
  );
}
