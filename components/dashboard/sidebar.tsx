"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store/store";
import { BarChart3, Cross, FileText, Folder, Home, LayoutDashboard, Scale, Settings, Users, X } from "lucide-react";
interface NavItem {
    title: string
    href: string
    icon: React.ElementType
    adminOnly?: boolean
};

const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Cases",
      href: "/dashboard/cases",
      icon: Scale,
    },
    {
      title: "Documents",
      href: "/dashboard/documents",
      icon: FileText,
    },
    
    {
      title: "Time Tracking",
      href: "/dashboard/time-tracking",
      icon: Home,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: BarChart3,
      adminOnly: true,
    },
    {
      title: "File Management",
      href: "",
      icon: Folder,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      adminOnly: true,
    },
];

interface DashboardSidebarProps {
    isOpen?: boolean
    onClose?: () => void
};
export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps){
    const pathname = usePathname();
    const {role} = useSelector((state: RootState)=>state.auth);

    const sidebarContent = (
        <>
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-primary-foreground">LegalTech</h1>
            <X className="md:hidden cursor-pointer" onClick={onClose} />
          </div>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              // Skip admin-only items for non-admin users
              if (item.adminOnly && role !== "admin") {
                return null
              }
    
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${pathname === item.href ?"bg-primary-foreground text-white":"text-muted-foreground hover:bg-slate-200 hover:text-foreground"}`}
                  onClick={onClose}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </>
    );

    return (
        <>
            {/* desktop sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:block">
                {sidebarContent}
            </aside>

            {/* mobile sidebar */}
            <div tabIndex={-1} className={`${isOpen?"translate-x-0":"-translate-x-full"} md:hidden fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-64 dark:bg-gray-800`}>
                {sidebarContent}
                
            </div>
        </>
    )
}