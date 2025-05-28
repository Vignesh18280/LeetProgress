'use client';
import Image from "next/image";
import Link from "next/link";
import SignOutButton from "../../src/app/signout/page";
import { Avatar, AvatarImage } from "./ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { LogOut} from "lucide-react";
import { useUser } from "../app/context/UserContext";



export default function Navbar() {
        const { user } = useUser();
        // console.log(user);
    return (
        <nav className="w-full flex justify-between items-center px-6 py-4">
            <div className="flex items-center">
                <Image src="/logo.png" alt="LeetProgress Logo" width={40} height={40} className="rounded-full" />
                <Link href="/">
                    <div className="ml-1 text-2xl font-extrabold">LeetProgress</div>
                </Link>
            </div>
            {user ? (
                <div className="flex items-center font-bold gap-3">
                    <Popover>
                        <PopoverTrigger><Avatar className="cursor-pointer h-10 w-10 mr-3">
                            <AvatarImage src={user?.profileUrl || user?.user?.image} alt="Avatar" />
                        </Avatar>
                        </PopoverTrigger>

                        <PopoverContent className='w-70 mr-4 bg-white shadow-md shadow-black'>
                            <div className="flex flex-col gap-4 space-y-2">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-8 w-8">
                                    <AvatarImage src={user?.profileUrl || user?.user?.image} alt="Avatar" />
                                    </Avatar>
                                    <div>
                                    <h4 className="text-lg font-bold">{user?.user?.name || user?.name}</h4>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
        
                                    <div className="flex gap-2 items-center">
                                        <LogOut />
                                        <SignOutButton />
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            ) : (
                <div className="flex ">
                    <Link href="/login">
                        <button className=" px-3 py-1 rounded-md text-lg cursor-pointer mr-2 hover:bg-gray-200">
                            Login
                        </button>
                    </Link>
                    <Link href="/signup">
                    <button className="bg-gray-900 text-white px-3 py-1 rounded-md text-lg cursor-pointer hover:bg-gray-800">
                        Sign Up
                    </button>
                    </Link>
                </div>
            )}

        </nav>
    );
};  