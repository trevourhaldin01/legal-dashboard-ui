"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store/store"


export default function ReportsPage() {
    const { role } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    // Redirect non-admin users
    useEffect(() => {
        if (role !== "admin") {
        router.push("/dashboard")
        }
    }, [role, router])

    if (role !== "admin") {
        return null
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                    <p className="text-muted-foreground">Analytics and reporting for your legal practice.</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <select defaultValue="Mar 2025" className="w-full md:w-[200px]">
                    <option>Jan 2025</option>
                    <option>Feb 2025</option>
                    <option>Mar 2025</option>
                    <option>2025</option>
                </select>

            </div>
        </div>
    )
}