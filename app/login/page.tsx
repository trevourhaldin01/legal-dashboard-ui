"use client";

import { login } from "@/lib/store/auth/authSlice";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, {FormEvent, useState} from "react";
import { useDispatch } from "react-redux";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] =useState(false);

    const dispatch = useDispatch();
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await new Promise((resolve)=>setTimeout(resolve,1000))
            if(
                email === "admin@legaltech.com" && password === "admin123" || //admin user
                email === "user@legaltech.com" && password === "user123"  //standard user
            ){
                // role assignment
                const role = email.startsWith("admin") ? "admin" : "user";
                dispatch(login({email, role}));
                router.push("/dashboard");
            } else {
                setError("Invalid Email or password");
            }
        } catch (err) {
            setError("An Error occured during login");
        } finally{
            setIsLoading(false)
        }

    }

    
    return (
        <div className="flex min-h-screen items-center justify-center   bg-slate-200 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="space-y-1 text-center">
                    <h4 className="text-2xl text-blue-600 font-bold">LegalTech Dashboard</h4>
                    <p>Enter your credentials to access the dashboard</p>
                </div>
                <div className="mt-10 rounded-md  outline-gray-600 p-10 bg-gray-50">
                    {error && (
                        <div className="flex items-center mb-4">
                            <AlertCircle className="h-4 w-4 mr-2 text-red-600"/>
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className=" space-y-2">
                            <label htmlFor="email" className="block font-medium">Email</label>
                            <input 
                                id="email"
                                type="email"
                                value={email}
                                placeholder="email@example.com"
                                onChange={(e)=>setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md outline-1 outline-gray-400 px-3 py-1.5 focus:outline-2"

                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="block font-medium">Password</label>
                            <input 
                                id="password"
                                type="password"
                                value={password}
                                placeholder="password"
                                onChange={(e)=>setPassword(e.target.value)}
                                required
                                className="block w-full rounded-md outline-1 outline-gray-400 px-3 py-1.5 focus:outline-2"
                            />
                        </div>
                        <button type="submit"  disabled={isLoading} className={`flex justify-center items-center w-full rounded-md ${isLoading ? "bg-blue-400":"bg-blue-600"} text-white px-3 py-1.5 cursor-pointer`} >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Logging in...
                                </>
                            ):(
                                "Sign In"
                            )}
                        </button>
                    </form>
                    <div className="mt-5 text-gray-500">
                        <p className="">Login Credentials</p>
                        <p>**admin**</p>
                        <p className="text-sm">Email: admin@legaltech.com</p>
                        <p className="text-sm">Password: admin123</p>
                        <p>**user**</p>
                        <p className="text-sm">Email: user@legaltech.com</p>
                        <p className="text-sm">Password: user123</p>
                    </div>
                </div>

            </div>

        </div>
    )
}