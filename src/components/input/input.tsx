"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
const DayOneComponent: React.FC = () => {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0") + ":00";
    return hour;
  });

  const categories = ["Temple", "Beach", "Museum", "Park", "Mall"];

  // Trigger opacity transition on page load
  useEffect(() => {
    setTimeout(() => setIsPageLoaded(true), 100);
  }, []);

  

  return (
    <>
      {/* Breadcrumb Section (Including Day 1 Header and Form) */}
      <section
        className={`pb-[120px] pt-[40px] transition-opacity duration-1000 ${
          isPageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto px-4">
          {/* Header Section */}
          <Breadcrumb 
        pageName="Day 1" 
        description="" 
      />
          {/* Form Section Below the Header */}
          <form className="flex flex-wrap justify-center items-center gap-6">
            {/* Start Time */}
            <div className="flex flex-col w-full sm:w-[200px]">
              <select
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="px-4 py-2 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" disabled>
                  Select Start Time
                </option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* End Time */}
            <div className="flex flex-col w-full sm:w-[200px]">
              <select
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="px-4 py-2 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" disabled>
                  Select End Time
                </option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="flex flex-col w-full sm:w-[200px]">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default DayOneComponent;
