"use client"
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Topics() {
    const topics: string[] = [
        "Array", "String", "Hash Table", "Dynamic Programming", "Math", "Sorting", "Greedy",
        "Depth-First Search", "Binary Search", "Database", "Matrix", "Breadth-First Search",
        "Tree", "Bit Manipulation", "Two Pointers", "Prefix Sum", "Heap (Priority Queue)",
        "Binary Tree", "Simulation", "Stack", "Graph", "Counting", "Sliding Window", "Design",
        "Enumeration", "Backtracking", "Union Find", "Linked List", "Number Theory",
        "Ordered Set", "Monotonic Stack", "Segment Tree", "Trie", "Combinatorics", "Bitmask",
        "Queue", "Recursion", "Divide and Conquer", "Memoization", "Binary Indexed Tree",
        "Geometry", "Binary Search Tree", "Hash Function", "String Matching", "Topological Sort",
        "Shortest Path", "Rolling Hash", "Game Theory", "Interactive", "Data Stream",
        "Monotonic Queue", "Brainteaser", "Randomized", "Merge Sort", "Doubly-Linked List",
        "Counting Sort", "Iterator", "Concurrency", "Probability and Statistics", "Quickselect",
        "Suffix Array", "Bucket Sort", "Line Sweep", "Minimum Spanning Tree", "Shell",
        "Reservoir Sampling", "Strongly Connected Component", "Eulerian Circuit", "Radix Sort",
        "Rejection Sampling", "Biconnected Component"
    ];

    const [collapse, setCollapse] = useState(true);

    return (
        <div className="flex flex-col items-star ml-8">
            <div className="text-lg font-extrabold">
                Topics:
            </div>
            <div className="border-1 rounded-md border-gray-800 flex flex-wrap py-1 px-2">
                { 
                    (collapse ? topics.slice(0, 8) : topics).map((topic, index) => (
                        <div 
                            key={index} 
                            className="bg-gray-100 text-gray-900 rounded-md px-3 py-1 mx-2 my-1 cursor-pointer hover:bg-gray-400 transition-all"
                            aria-label={`Topic ${topic}`}
                        >
                            {topic}
                        </div>
                    ))
                }
                <div 
                    className="bg-gray-700 text-white  rounded-md px-3 py-1 mx-2 my-1 cursor-pointer hover:bg-gray-600 transition-all flex items-center"
                    onClick={() => setCollapse(!collapse)}
                >
                    {collapse ? "Expand" : "Collapse"}
                    {collapse ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </div>
            </div>
        </div>
    );
}
