import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full flex justify-between items-center px-6 py-4">
            <div className="flex items-center">
                <Image src="/logo.png" alt="LeetProgress Logo" width={40} height={40} className="rounded-full"/>
                <Link href="/">
                    <div className="ml-1 text-2xl font-extrabold">LeetProgress</div>
                </Link>
            </div>
            <div className="flex ">
                <button className=" px-2 py-1 rounded-md text-lg cursor-pointer mr-2">
                    Login
                </button>
                <button className="bg-black text-white px-2 py-1 rounded-md text-lg cursor-pointer">
                    Sign Up
                </button>
            </div>
        </nav>
    );
};  