"use client";
import React, { useState } from "react";

const DayOneComponent: React.FC = () => {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0") + ":00";
    return hour;
  });

  const categories = ["Temple", "Beach", "Museum", "Park", "Mall"];

  return (
    <>
      {/* Breadcrumb Section (Including Day 1 Header and Form) */}
      <section className="pb-[120px] pt-[40px]">
        <div className="container mx-auto px-4">
          {/* Header Section */}

          <h1 className="mb-5 text-2xl font-bold text-white sm:text-3xl">
              Day 1
            </h1>
          {/* Form Section Below the Header */}
          <form className="flex flex-wrap justify-center items-center gap-20">
            {/* Start Time */}
            <div className="flex flex-col w-full sm:w-[200px]">
              <select
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="px-0 py-1 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="px-50 py-1 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="px-50 py-1 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
