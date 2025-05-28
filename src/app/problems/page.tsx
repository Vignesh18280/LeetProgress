"use client";
import Topics from "../../components/Topics";
import Difficulty from "../../components/Difficulty";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import Image from "next/image";
import { useEffect, useState } from "react";
import httpAxios from "../utils/httpAxios";
type ProblemType = {
    title: string;
    contestName: string;
    link: string;
    topics: string[];
  };

export default function Problems() {
    const [problems, setProblems] = useState<ProblemType[]>([]);
    const [topic, setTopic] = useState<string | null>(null);
    const [problemNumber, setProblemNumber] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await httpAxios.post("/api/problems", { problemNumber }).then(res => res.data);
                setProblems(result);
                setCurrentPage(1);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [problemNumber]);
    useEffect(() => {
        setCurrentPage(1);
    }, [topic]);
  
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const filteredProblems = topic
  ? problems.filter((problem) => problem.topics.includes(topic))
  : problems;
  const currentPosts = filteredProblems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProblems.length / postsPerPage);  

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-100 text-gray-900">
            <div className="flex mt-4 mx-8 items-start">
            <Difficulty number={problemNumber} setNumber={setProblemNumber} />
            <Topics topic={topic} setTopic={setTopic} />
            
            </div>
            <div className="flex w-full justify-center mt-8">
                <div className="w-10/12 bg-white/50 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden">
                    <Table aria-label="LeetProgress Problem Table" className="w-full">
                        <TableHeader>
                            <TableColumn className="text-left text-lg font-bold uppercase bg-gray-200 p-4">
                                Problems
                            </TableColumn>
                            <TableColumn className="text-left text-lg font-bold uppercase bg-gray-200 p-4">
                                Contest
                            </TableColumn>
                            <TableColumn className="text-left text-lg font-bold uppercase bg-gray-200 p-4">
                                Topics
                            </TableColumn>
                            <TableColumn className="text-left text-lg font-bold uppercase bg-gray-200 p-4">
                                Solve
                            </TableColumn>
                        </TableHeader>
                        <TableBody>
                            {currentPosts.map((problem, index) => (
                               <TableRow
                                key={index}
                                    onClick={() => window.open(problem.link, "_blank")}
                                    className={`cursor-pointer border-b border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
                                >
                                    <TableCell className="text-left text-lg p-4">{problem.title}</TableCell>
                                    <TableCell className="text-left text-md p-4">{problem.contestName}</TableCell>
                                    <TableCell className="text-left text-lg p-4">
                                        <div className="flex flex-wrap gap-2">
                                        {problem.topics.map((topic, i) => (
                                            <span
                                            key={i}
                                            className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm"
                                            >
                                            {topic}
                                            </span>
                                        ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-left text-lg p-4">
                                        <Image
                                        src="/leetlogo.png"
                                        alt="LeetProgress Logo"
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                        />
                                    </TableCell>
                             </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="flex justify-center my-4 gap-2">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                        >
                            &laquo;
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(page =>
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 && page <= currentPage + 1)
                            )
                            .reduce<(number | string)[]>((acc, page, i, arr) => {
                                if (i > 0 && page - arr[i - 1] > 1) {
                                    acc.push("...");
                                }
                                acc.push(page);
                                return acc;
                            }, [])
                            .map((item, index) =>
                                item === "..." ? (
                                    <span key={index} className="px-2">...</span>
                                ) : (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(item as number)}
                                        className={`px-3 py-1 rounded border ${item === currentPage ? "bg-gray-700 text-white" : "border-gray-300 hover:bg-gray-200"}`}
                                    >
                                        {item}
                                    </button>
                                )
                            )}

                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                        >
                            &raquo;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
