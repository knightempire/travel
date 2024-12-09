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
  const [errorMessages, setErrorMessages] = useState<string[][][]>([]); // State to store error messages for each field

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0") + ":00";
    return hour;
  });

  const categories = ["Temple", "Beach", "Museum", "Park", "Mall"];

  useEffect(() => {
    setDayDetails(Array.from({ length: tripDays }, () => []));
    setErrorMessages(Array.from({ length: tripDays }, () => [])); // Initialize error messages for each day
    setTimeout(() => setIsPageLoaded(true), 100);
  }, [tripDays]);

  const handleInputChange = (
    dayIndex: number,
    slotIndex: number,
    field: "startTime" | "endTime" | "category",
    value: string
  ) => {
    const updatedDetails = [...dayDetails];
    const updatedErrors = [...errorMessages];

    // Update the value in the slot
    if (!updatedDetails[dayIndex][slotIndex]) {
      updatedDetails[dayIndex][slotIndex] = { startTime: "", endTime: "", category: "" };
    }
    updatedDetails[dayIndex][slotIndex][field] = value;

    // Adjust subsequent slots if needed
    if (field === "startTime" && value) {
      for (let i = slotIndex + 1; i < updatedDetails[dayIndex].length; i++) {
        const prevEndTime = updatedDetails[dayIndex][i - 1]?.endTime || value;
        if (updatedDetails[dayIndex][i]?.startTime < prevEndTime) {
          updatedDetails[dayIndex][i].startTime = prevEndTime;
        }
        if (
          updatedDetails[dayIndex][i]?.endTime &&
          updatedDetails[dayIndex][i]?.endTime <= prevEndTime
        ) {
          updatedDetails[dayIndex][i].endTime = "";
        }
      }
    }

    if (field === "endTime" && value) {
      for (let i = slotIndex + 1; i < updatedDetails[dayIndex].length; i++) {
        if (updatedDetails[dayIndex][i]?.startTime < value) {
          updatedDetails[dayIndex][i].startTime = value;
        }
      }
    }

    // Clear error for the field
    if (!updatedErrors[dayIndex][slotIndex]) {
      updatedErrors[dayIndex][slotIndex] = ["", "", ""];
    }
    updatedErrors[dayIndex][slotIndex][field === "startTime" ? 0 : field === "endTime" ? 1 : 2] = "";

    setDayDetails(updatedDetails);
    setErrorMessages(updatedErrors);
  };

  const handleAddSlot = (dayIndex: number) => {
    const updatedDetails = [...dayDetails];
    const updatedErrors = [...errorMessages];

    updatedDetails[dayIndex].push({ startTime: "", endTime: "", category: "" });
    updatedErrors[dayIndex].push(["", "", ""]);

    setDayDetails(updatedDetails);
    setErrorMessages(updatedErrors);
  };

  const handleRemoveSlot = (dayIndex: number, slotIndex: number) => {
    const updatedDetails = [...dayDetails];
    const updatedErrors = [...errorMessages];

    updatedDetails[dayIndex].splice(slotIndex, 1);
    updatedErrors[dayIndex].splice(slotIndex, 1);

    setDayDetails(updatedDetails);
    setErrorMessages(updatedErrors);
  };

  const handleSubmit = (dayIndex: number) => {
    const updatedErrors = [...errorMessages];
    let isValid = true;

    dayDetails[dayIndex].forEach((slot, slotIndex) => {
      const errors = ["", "", ""];
      if (!slot.startTime) {
        isValid = false;
        errors[0] = "Start time is required.";
      }
      if (!slot.endTime) {
        isValid = false;
        errors[1] = "End time is required.";
      } else if (slot.startTime && slot.endTime <= slot.startTime) {
        isValid = false;
        errors[1] = "End time must be greater than start time.";
      }
      if (!slot.category) {
        isValid = false;
        errors[2] = "Category is required.";
      }
      updatedErrors[dayIndex][slotIndex] = errors;
    });

    setErrorMessages(updatedErrors);

    if (!isValid) {
      return;
    }

    console.log(`Day ${dayIndex + 1} Details:`, dayDetails[dayIndex]);
  };

  const isAddSlotButtonDisabled = (dayIndex: number) => {
    const slots = dayDetails[dayIndex] || []; // Ensure it's always an array
    if (slots.length >= 10) {
      return true; // Disable if 10 slots already exist
    }
    const lastSlot = slots[slots.length - 1];
    return lastSlot?.endTime === "23:00" || lastSlot?.endTime === "22:00";
  };
  

  return (
    <>
      <section
        className={`pb-[120px] pt-[10px] transition-opacity duration-1000 ${
          isPageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Breadcrumb pageName="Day Plan" description="" />
        <div className="mx-auto px-6 sm:px-10 lg:px-16">
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
                    {dayDetails[dayIndex]?.map((slot, slotIndex) => (
                      <div
                        key={slotIndex}
                        className="flex flex-wrap gap-4 lg:gap-6 w-full"
                      >
                        {/* Start Time */}
                        <div className="flex flex-col w-full sm:w-[200px]">
                          <select
                            value={slot.startTime || ""}
                            onChange={(e) => {
                              const newStartTime = e.target.value;
                              handleInputChange(dayIndex, slotIndex, "startTime", newStartTime);
                            }}
                            className="px-4 py-2 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="" disabled>
                              Select Start Time
                            </option>
                            {timeOptions
                              .filter(
                                (time) =>
                                  !slotIndex ||
                                  time >
                                    (dayDetails[dayIndex][slotIndex - 1]?.endTime || "00:00")
                              )
                              .map((time) => (
                                <option key={time} value={time}>
                                  {time}
                                </option>
                              ))}
                          </select>
                          {errorMessages[dayIndex]?.[slotIndex]?.[0] && (
                            <span className="text-red-500 text-sm mt-1">
                              {errorMessages[dayIndex][slotIndex][0]}
                            </span>
                          )}
                        </div>

                        {/* End Time */}
                        <div className="flex flex-col w-full sm:w-[200px]">
                          <select
                            value={slot.endTime || ""}
                            onChange={(e) =>
                              handleInputChange(dayIndex, slotIndex, "endTime", e.target.value)
                            }
                            className="px-4 py-2 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={!slot.startTime}
                          >
                            <option value="" disabled>
                              Select End Time
                            </option>
                            {slot.startTime &&
                              timeOptions
                                .filter((time) => time > slot.startTime)
                                .map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                          </select>
                          {errorMessages[dayIndex]?.[slotIndex]?.[1] && (
                            <span className="text-red-500 text-sm mt-1">
                              {errorMessages[dayIndex][slotIndex][1]}
                            </span>
                          )}
                        </div>

                        {/* Category */}
                        <div className="flex flex-col w-full sm:w-[200px]">
                          <select
                            value={slot.category || ""}
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
                          {errorMessages[dayIndex]?.[slotIndex]?.[2] && (
                            <span className="text-red-500 text-sm mt-1">
                              {errorMessages[dayIndex][slotIndex][2]}
                            </span>
                          )}
                        </div>

                        {/* Remove Slot Button */}
                        <div>
                          <button
                            type="button"
                            onClick={() => handleRemoveSlot(dayIndex, slotIndex)}
                            className="px-4 py-2.5 bg-red-400 text-white rounded-md shadow-sm hover:bg-red-500 transition"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Buttons Row */}
                    <div className="flex justify-start items-center mt-4 gap-12">
                      {!isAddSlotButtonDisabled(dayIndex) && (
                        <button
                          type="button"
                          onClick={() => handleAddSlot(dayIndex)}
                          className="px-4 py-2 bg-gray-400 text-white font-bold rounded-md shadow-lg hover:bg-gray-500 transition"
                        >
                          + add slot
                        </button>
                      )}
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
