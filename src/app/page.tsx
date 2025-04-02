"use client";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-100 text-gray-900 ">
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <h1 className="text-5xl font-extrabold leading-tight">
          Master Leetcode,
        </h1>
        <h1 className="text-5xl font-extrabold text-gray-700">
          One Badge at a Time
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl">
          Leetcode contest problems, structured by badge difficulty and topic. 
          Pick a badge, solve problems, and improve!
        </p>
        <div className="mt-6 flex space-x-4">
          <Link href="/problems">
            <button className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium cursor-pointer" >
              Explore Problems
            </button>
          </Link>
          <button className="border border-gray-800 text-gray-900 px-6 py-3 rounded-lg text-lg font-medium cursor-pointer">
          Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
