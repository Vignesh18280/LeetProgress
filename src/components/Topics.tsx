"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
type TopicsProps = {
    topic: string | null;
    setTopic: React.Dispatch<React.SetStateAction<string | null>>;
  };
export default function Topics({ topic, setTopic } : TopicsProps) {
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
    const [selectedTopic, setSelectedTopic] = useState<string | null>(topic);
    useEffect(() => {
        setTopic(selectedTopic);
    }, [selectedTopic, setTopic]);
    return (
        <div className="flex flex-col items-start ml-8 mr-8">
            <div className="text-lg font-extrabold">Topics:</div>
            <div className="border rounded-md border-gray-800 flex flex-wrap py-1 px-1 mt-2">
                {selectedTopic && (
                    <div
                        className="bg-red-500 text-white rounded-md px-3 py-1 mx-2 my-1 cursor-pointer hover:bg-red-600 transition-all"
                        onClick={() => setSelectedTopic(null)}
                        aria-label="Clear topic filter"
                    >
                        Clear
                    </div>
                )}
                {
                    (collapse ? topics.slice(0, 8) : topics).map((topic, index) => (
                        <div
                            key={index}
                            className={`rounded-md px-3 py-1 mx-2 my-1 cursor-pointer transition-all
                                ${selectedTopic === topic ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-900 hover:bg-gray-400"}`}
                            onClick={() => setSelectedTopic(topic)}
                            aria-label={`Topic ${topic}`}
                        >
                            {topic}
                        </div>
                    ))
                }
                <div
                    className="bg-gray-700 text-white rounded-md px-3 py-1 mx-2 my-1 cursor-pointer hover:bg-gray-600 transition-all flex items-center"
                    onClick={() => setCollapse(!collapse)}
                >
                    {collapse ? "Expand" : "Collapse"}
                    {collapse ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </div>
            </div>
        </div>
    );
}
