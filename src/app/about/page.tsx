"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart2,
  Filter,
  ListOrdered,
  ExternalLink,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  const [stats, setStats] = useState({
    contests: 0,
    questions: 0,
    topics: 0,
  });

  useEffect(() => {
    const durations = {
      contests: 30,
      questions: 100,
      topics: 10,
    };

    const ends = {
      contests: 120,
      questions: 2000,
      topics: 15,
    };

    (Object.keys(durations) as Array<keyof typeof durations>).forEach((key) => {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setStats((prev) => ({
          ...prev,
          [key]: count,
        }));
        if (count >= ends[key]) clearInterval(interval);
      }, durations[key]);
    });
  }, []);

  const features = [
    {
      title: "Difficulty-Based Sorting",
      description: "View all LeetCode contest questions by difficulty.",
      icon: ListOrdered,
    },
    {
      title: "Topic Filtering",
      description: "Filter questions by data structures and algorithms topics.",
      icon: Filter,
    },
    {
      title: "Grouped Practice Sets",
      description: "Grouped questions for topic-wise focused practice.",
      icon: LayoutDashboard,
    },
    {
      title: "Direct LeetCode Links",
      description: "Direct links to LeetCode to solve each problem.",
      icon: ExternalLink,
    },
    {
      title: "Clean UI",
      description: "Minimalist white-grey UI with soft gradients.",
      icon: BarChart2,
    },
    {
      title: "Real-Time Updates",
      description: "Stay updated with real-time contest and question additions.",
      icon: BarChart2, 
    },
  ];
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-white text-gray-800 px-4 py-12 flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-bold animate-fadeIn">About Our App</h1>
  
      <p className="max-w-3xl text-center text-gray-600 text-sm animate-fadeIn delay-100">
  Practice smarter with all LeetCode contest questions categorized by difficulty and topic.
  Whether you&apos;re preparing for contests or interviews, this platform makes it easier to focus,
  filter, and practice effectively.
</p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
      <Image
  src="/programming.svg"
  alt="Coding Practice"
  width={320}        
  height={320}
  className="animate-fadeIn delay-200 transition-transform duration-500 hover:-translate-y-1 hover:scale-105"
/>
  
        <div className="flex justify-center gap-10 text-center">
          {["contests", "questions", "topics"].map((key) => (
            <div
              key={key}
              className="transition-transform duration-300 hover:scale-110"
            >
              <h3 className="text-5xl font-bold text-gray-900">
                {stats[key as keyof typeof stats]}+
              </h3>
              <p className="text-gray-500 capitalize">{key}</p>
            </div>
          ))}
        </div>
      </div>
  
      <div className="max-w-6xl w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center animate-fadeIn delay-300">
          Boost Your Prep With
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {features.map((feature, idx) => {
    const Icon = feature.icon;
    return (
      <div
        key={idx}
        className="
  bg-white rounded-xl shadow-md p-6
  transition-colors duration-1000 ease-in-out
  hover:scale-105 hover:shadow-lg
  hover:bg-gradient-to-r hover:from-gray-500 hover:via-gray-600 hover:to-gray-800
  hover:text-white
  cursor-pointer
"
      >
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-6 h-6 transition-transform group-hover:rotate-6" />
          <h3 className="text-xl font-semibold">{feature.title}</h3>
        </div>
        <p>{feature.description}</p>
      </div>
    );
  })}
</div>

      </div>
    </div>
  );
  
};

export default AboutPage;
