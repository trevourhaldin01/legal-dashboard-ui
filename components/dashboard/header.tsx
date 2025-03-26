import { Menu, User,ChevronDown,Settings,LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { logout } from "@/lib/store/auth/authSlice";

interface Dashboardheaderprops {
    onSidebarOpen: ()=> void
}

export default function DashboardHeader({onSidebarOpen}: Dashboardheaderprops){
    const {email, role} = useSelector((state: RootState)=>state.auth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = ()=>{
        dispatch(logout());
        router.push("/login")
    };

    return (
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <button className="md:hidden mr-2 cursor-pointer" onClick={onSidebarOpen} >
                <Menu className="h-5 w-5" />
            </button>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
                <div className="relative inline-block">
                    <div className="">
                        <button onClick={()=>setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer">
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-blue-600">
                                <User className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col items-start text-sm">
                                <span className="font-medium">{email}</span>
                                <span className="text-xs text-muted-foreground capitalize">{role} Role</span>
                            </div>
                            <ChevronDown className="h-4 w-4 text-blue-600" />
                        </button>
                    </div>
                    <div className={`${isDropdownOpen? "block":"hidden"} absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition duration-100 focus:outline-hidden `}>
                        <div className="py-1 ">
                            <div className="flex items-center  px-2 py-3 hover:bg-gray-200">
                                <User className="mr-2 h-4 w-4 text-blue-600" />
                                <span>Profile</span>
                            </div>
                            <div className="flex items-center px-2 py-3 hover:bg-gray-200">
                                <Settings className="mr-2 h-4 w-4 text-blue-600" />
                                <span>Settings</span>
                            </div>
                            <div className="divide-gray-900"></div>
                            <div onClick={handleLogout} className="flex items-center px-2 py-3 hover:bg-gray-200">
                                <LogOut className="mr-2 h-4 w-4 text-blue-600" />
                                <span>Log out</span>
                            </div>

                        </div>

                    </div>

                </div>
            
            </div>

        </header>
    )
}
