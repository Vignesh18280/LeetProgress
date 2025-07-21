'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SignOutButton from "../../src/app/signout/page";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LogOut, Menu } from "lucide-react";
import { useUser } from "../app/context/UserContext";

export default function Navbar() {
    const { user } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="w-full flex justify-between items-center px-6 py-4">
            <div className="flex items-center">
                <Image src="/logo.png" alt="LeetProgress Logo" width={40} height={40} className="rounded-full" />
                <Link href="/">
                    <div className="ml-1 text-2xl font-extrabold">LeetProgress</div>
                </Link>
            </div>

            <div className="hidden md:flex items-center font-bold gap-3">
                {user ? (
                    <Popover>
                        <PopoverTrigger>
                            <Avatar className="cursor-pointer h-10 w-10 mr-3">
                                <AvatarImage src={user?.profileUrl || user?.user?.image} alt="Avatar" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-70 mr-4 bg-white shadow-md shadow-black">
                            <div className="flex flex-col gap-4 space-y-2">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.profileUrl || user?.user?.image} alt="Avatar" />
                                    </Avatar>
                                    <h4 className="text-lg font-bold">{user?.user?.name || user?.name}</h4>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <LogOut />
                                    <SignOutButton />
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <>
                        <Link href="/login">
                            <button className="px-3 py-1 rounded-md text-lg cursor-pointer mr-2 hover:bg-gray-200">
                                Login
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button className="bg-gray-900 text-white px-3 py-1 rounded-md text-lg cursor-pointer hover:bg-gray-800">
                                Sign Up
                            </button>
                        </Link>
                    </>
                )}
            </div>
            <div className="md:hidden">
                <Menu className="h-6 w-6 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>

            {isMenuOpen && (
                <div className="absolute top-16 right-4 bg-white shadow-md rounded-md p-4 flex flex-col gap-3 z-50 md:hidden w-48">
                    {user ? (
                        <>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user?.profileUrl || user?.user?.image} alt="Avatar" />
                                </Avatar>
                                <span className="font-bold">{user?.user?.name || user?.name}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <LogOut />
                                <SignOutButton />
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <button className="text-left w-full px-3 py-1 rounded-md hover:bg-gray-100">
                                    Login
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="text-left w-full bg-gray-900 text-white px-3 py-1 rounded-md hover:bg-gray-800">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
