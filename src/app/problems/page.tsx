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
    const [loading, setLoading] = useState(false);
    const postsPerPage = 5;
    useEffect(() => {
        function extractContestNumber(contestName: string): number {
            return parseInt(contestName.match(/\d+/)?.[0] ?? "1", 10);
        }

        function getContestDate(contestName: string): Date {
            const num = extractContestNumber(contestName);

            if (contestName.startsWith("Weekly")) {
                // Weekly Contest 395 = Apr 28, 2024 (Sun, 8 AM IST)
                const base = new Date("2024-04-28T08:00:00+05:30");
                const diff = num - 395;
                return new Date(base.getTime() + diff * 7 * 24 * 60 * 60 * 1000);
            } else if (contestName.startsWith("Biweekly")) {
                // Biweekly Contest 129 = Apr 27, 2024 (Sat, 8 PM IST)
                const base = new Date("2024-04-27T20:00:00+05:30");
                const diff = num - 129;
                return new Date(base.getTime() + diff * 14 * 24 * 60 * 60 * 1000);
            }

            throw new Error("Unknown contest type: " + contestName);
        }

        async function getContestSorted(contestProblems: ProblemType[]) {
            return contestProblems
                .map(p => ({
                ...p,
                contestDate: getContestDate(p.contestName)
            }))
            .sort((a, b) => b.contestDate.getTime() - a.contestDate.getTime()); 
        }

        const getData = async () => {
            setLoading(true);
            try {
                const result = await httpAxios.post("/api/problems", { problemNumber }).then(res => res.data);
                const sortedProblems = await getContestSorted(result);
                setProblems(sortedProblems);
                setCurrentPage(1);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
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
            <div className="flex flex-col md:flex-row mt-4 mx-4 md:mx-8 gap-4 items-center">
                <Difficulty number={problemNumber} setNumber={setProblemNumber} />
                <Topics topic={topic} setTopic={setTopic} />
            </div>
            <div className="flex w-full justify-center mt-8">
                <div className="w-10/12 bg-white/50 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden">
                    {loading ? (
                        <div className="text-center py-10 text-xl font-semibold">
                            Loading problems...
                        </div>
                    ) : (
                        <>
                            <Table aria-label="LeetProgress Problem Table" className="w-full table-fixed">
                                <TableHeader>
                                    <TableColumn className="text-center text-lg font-bold uppercase bg-gray-200 p-4 w-[40%]">Problems</TableColumn>
                                    <TableColumn className="text-center text-lg font-bold uppercase bg-gray-200 p-4 w-[30%]">Contest</TableColumn>
                                    <TableColumn className="text-center text-lg font-bold uppercase bg-gray-200 p-4 w-[30%]">Topics</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {currentPosts.map((problem, index) => (
                                        <TableRow
                                            key={index}
                                            onClick={() => window.open(problem.link, "_blank")}
                                            className={`cursor-pointer border-b border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
                                        >
                                            <TableCell className="text-left text-[10px] md:text-[15px] p-4">
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src="/leetlogo.png"
                                                        alt="LeetProgress Logo"
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full hidden md:block"
                                                    />
                                                    <span>{problem.title}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-left text-[8px] md:text-[12px] p-4">{problem.contestName}</TableCell>
                                            <TableCell className="text-center p-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {problem.topics.map((topic, i) => (
                                                        <span
                                                            key={i}
                                                            className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-[8px] md:text-[10px]"
                                                        >
                                                            {topic}
                                                        </span>
                                                    ))}
                                                </div>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div className="flex justify-center my-4 gap-2">
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 cursor-pointer rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                                >
                                    &laquo;
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter((page) =>
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
                                                className={`px-3 py-1 rounded border cursor-pointer ${item === currentPage ? "bg-gray-700 text-white" : "border-gray-300 hover:bg-gray-200"}`}
                                            >
                                                {item}
                                            </button>
                                        )
                                    )}

                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 rounded border cursor-pointer border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                                >
                                    &raquo;
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}