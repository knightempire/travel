"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";

interface InputComponentProps {
  tripDays: number; // Prop to receive the trip duration
}

const DayOneComponent: React.FC<InputComponentProps> = ({ tripDays }) => {
  const [dayDetails, setDayDetails] = useState<
    { startTime: string; endTime: string; category: string }[][]
  >([]);
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0") + ":00";
    return hour;
  });

  const categories = ["Temple", "Beach", "Museum", "Park", "Mall"];

  useEffect(() => {
    setDayDetails(Array.from({ length: tripDays }, () => []));
    setTimeout(() => setIsPageLoaded(true), 100);
  }, [tripDays]);

  const handleInputChange = (
    dayIndex: number,
    slotIndex: number,
    field: "startTime" | "endTime" | "category",
    value: string
  ) => {
    const updatedDetails = [...dayDetails];
    updatedDetails[dayIndex][slotIndex] = {
      ...updatedDetails[dayIndex][slotIndex],
      [field]: value,
    };
    setDayDetails(updatedDetails);
  };

  const handleAddSlot = (dayIndex: number) => {
    const updatedDetails = [...dayDetails];
    updatedDetails[dayIndex].push({ startTime: "", endTime: "", category: "" });
    setDayDetails(updatedDetails);
  };

  const handleSubmit = (dayIndex: number) => {
    console.log(`Day ${dayIndex + 1} Details:`, dayDetails[dayIndex]);
  };

  return (
    <>
      <section
        className={`pb-[120px] pt-[10px] transition-opacity duration-1000 ${
          isPageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Breadcrumb pageName="Day Plan" description="" />
        <div className="mx-auto px-6 sm:px-10 lg:px-16"> {/* Adjusted padding */}
          {tripDays > 0 && (
            <div>
              {Array.from({ length: tripDays }).map((_, dayIndex) => (
                <div key={dayIndex} className="mb-8">
                  <h1 className="text-2xl font-bold">Day {dayIndex + 1}</h1>

                  <form
                    className="flex flex-col gap-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(dayIndex);
                    }}
                  >
                    {dayDetails[dayIndex]?.map((_, slotIndex) => (
                      <div
                        key={slotIndex}
                        className="flex flex-wrap gap-4 lg:gap-6 w-full"
                      >
                        {/* Start Time */}
                        <div className="flex flex-col w-full sm:w-[200px]">
                          <select
                            value={dayDetails[dayIndex][slotIndex]?.startTime || ""}
                            onChange={(e) =>
                              handleInputChange(dayIndex, slotIndex, "startTime", e.target.value)
                            }
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
                            value={dayDetails[dayIndex][slotIndex]?.endTime || ""}
                            onChange={(e) =>
                              handleInputChange(dayIndex, slotIndex, "endTime", e.target.value)
                            }
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
                            value={dayDetails[dayIndex][slotIndex]?.category || ""}
                            onChange={(e) =>
                              handleInputChange(dayIndex, slotIndex, "category", e.target.value)
                            }
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
                      </div>
                    ))}

                    {/* Buttons Row */}
                    <div className="flex flex-col sm:flex-row items-center sm:gap-6 mt-4 sm:mt-0"> {/* Adjusted for mobile responsiveness */}
                      {/* Add Slot Button */}
                      <button
                        type="button"
                        onClick={() => handleAddSlot(dayIndex)}
                        className="px-6 py-2 bg-gray-400 text-white font-bold rounded-md shadow-lg hover:bg-gray-500 transition mb-4 sm:mb-0" // mb-4 for mobile, no margin for larger screens
                      >
                        <span className="mr-2">+</span>Add Slot
                      </button>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="px-6 py-2 bg-primary text-white font-bold rounded-md shadow-lg hover:bg-primary-dark transition"
                      >
                        Submit Day {dayIndex + 1}
                      </button>
                    </div>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DayOneComponent;
