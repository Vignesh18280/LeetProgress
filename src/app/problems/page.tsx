"use client";
import Navbar from "../../../components/Navbar";
import Topics from "../../../components/Topics";
import Difficulty from "../../../components/Difficulty";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

// Sample Problem Data
const problems = [
    { name: "Two Sum", contest: "BW-100", link: "https://leetcode.com/problems/two-sum/" },
    { name: "Reverse Linked List", contest: "W-300", link: "https://leetcode.com/problems/reverse-linked-list/" },
    { name: "Binary Search", contest: "BW-105", link: "https://leetcode.com/problems/binary-search/" },
    { name: "Merge Intervals", contest: "W-320", link: "https://leetcode.com/problems/merge-intervals/" },
];

export default function Problems() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-100 text-gray-900">
            <Navbar />
            <div className="flex mt-4 mx-8 items-start">
                <Difficulty />
                <Topics />
            </div>
            <div className="flex w-full justify-center mt-8">
                <div className="w-10/12 bg-white/50 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden">
                    <Table aria-label="LeetProgress Problem Table" className="w-full">
                        {/* Header */}
                        <TableHeader>
                            <TableColumn className="text-left text-lg font-bold uppercase bg-gray-200 p-4">
                                Problem
                            </TableColumn>
                            <TableColumn className="text-left text-lg font-bold uppercase bg-gray-200 p-4">
                                Contest
                            </TableColumn>
                            <TableColumn className="text-left text-lg font-bold uppercase bg-gray-200 p-4">
                                Solve
                            </TableColumn>
                        </TableHeader>
                        
                        {/* Body */}
                        <TableBody>
                            {problems.map((problem, index) => (
                                <TableRow 
                                    key={index} 
                                    className={`border-b border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
                                >
                                    <TableCell className="text-left text-lg p-4">{problem.name}</TableCell>
                                    <TableCell className="text-left text-lg p-4">{problem.contest}</TableCell>
                                    <TableCell className="text-left text-lg p-4">
                                        <a
                                            href={problem.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                                        >
                                            Solve →
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
