"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store/store";
import { useEffect,useState} from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout(
    {children}:Readonly<{children: React.ReactNode}>
){
    const {isAuthenticated} = useSelector((state: RootState)=>state.auth);
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(()=>{
        if(!isAuthenticated){
            router.push("/login");
        }
    },[isAuthenticated, router]);

    if(!isAuthenticated){
        return null
    };
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <DashboardSidebar isOpen={sidebarOpen} onClose={()=>setSidebarOpen(false)}/>
            <div className="flex flex-col flex-1 overflow-hidden" >
                <DashboardHeader onSidebarOpen={()=>setSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
            </div>

        </div>
    )
}