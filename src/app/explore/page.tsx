"use client";

import React, { useState, useEffect } from "react";
import { Button, Form, DatePicker, AutoComplete, message } from "antd";
import dayjs from "dayjs";
import Breadcrumb from "@/components/Common/Breadcrumb";
import InputComponent from "@/components/input/input";

interface City {
  name: string;
}

// Constants for location
const COUNTRY = {
  name: "India",
  code: "IN",
};

const STATE = {
  name: "Tamil Nadu",
  code: "TN",
};

const ExplorePage: React.FC = () => {
  const [form] = Form.useForm();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(null);
  const [tripDays, setTripDays] = useState<number>(0);

  // State for district suggestions
  const [fromPlaceOptions, setFromPlaceOptions] = useState<{ value: string }[]>([]);
  const [toPlaceOptions, setToPlaceOptions] = useState<{ value: string }[]>([]);
  const [allDistricts, setAllDistricts] = useState<string[]>([]);

  // Get API key and base URL from environment variables
  const PLACE_API_KEY = process.env.NEXT_PUBLIC_PLACE_API_KEY;
  const PLACE_API_BASE_URL = process.env.NEXT_PUBLIC_PLACE_API_BASE_URL;

  useEffect(() => {
    // Check if API key or URL is missing
    if (!PLACE_API_KEY || !PLACE_API_BASE_URL) {
      message.error("API key or base URL is missing!");
      return;
    }

    // Fetch Tamil Nadu districts on component mount
    fetchTamilNaduDistricts();
    setTimeout(() => setIsPageLoaded(true), 100);
  }, [PLACE_API_KEY, PLACE_API_BASE_URL]);

  const fetchTamilNaduDistricts = async () => {
    try {
      const response = await fetch(
        `${PLACE_API_BASE_URL}/countries/${COUNTRY.code}/states/${STATE.code}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY": PLACE_API_KEY || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch districts");
      }

      const data: City[] = await response.json();

      // Ensure all items are strings and create unique districts
      const districts = Array.from(
        new Set(
          data
            .map((city) => city.name)
            .filter((name): name is string => typeof name === "string")
        )
      );

      setAllDistricts(districts);
    } catch (error) {
      console.error("Error fetching districts:", error);
      message.error("Failed to load districts. Please try again.");
    }
  };

  const onFinish = (values: any) => {
    if (values.startdate && values.enddate) {
      const fromDate = dayjs(values.startdate);
      const toDate = dayjs(values.enddate);

      const daysDifference = toDate.diff(fromDate, "day");

      console.log("Form values:", values);
      console.log(`Total trip duration: ${daysDifference + 1} days`);
      console.log(
        `From: ${fromDate.format("YYYY-MM-DD")} to ${toDate.format("YYYY-MM-DD")}`
      );

      setTripDays(daysDifference + 1);
    }
  };

  // Handle district suggestions
  const handleFromPlaceSearch = (value: string) => {
    if (value.length > 0) {
      // Filter districts based on input
      const suggestions = allDistricts
        .filter((district) =>
          district.toLowerCase().includes(value.toLowerCase())
        )
        .map((district) => ({ value: district }));

      setFromPlaceOptions(suggestions);
    } else {
      setFromPlaceOptions([]);
    }
  };

  const handleToPlaceSearch = (value: string) => {
    if (value.length > 0) {
      // Filter districts based on input
      const suggestions = allDistricts
        .filter((district) =>
          district.toLowerCase().includes(value.toLowerCase())
        )
        .map((district) => ({ value: district }));

      setToPlaceOptions(suggestions);
    } else {
      setToPlaceOptions([]);
    }
  };

  const handleFromDateChange = (date: dayjs.Dayjs | null) => {
    setFromDate(date);
    form.setFieldsValue({ enddate: null });
  };

  const disabledToDate = (current: dayjs.Dayjs) => {
    return (
      (fromDate && current <= fromDate) ||
      (!fromDate && current < dayjs().startOf("day"))
    );
  };

  return (
    <>
      <div
        className={`transition-opacity duration-100 ${
          isPageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Breadcrumb pageName="Travel Search" description={`travels`} />

        <section className="pt-[40px]">
          <div className="container px-4">
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"  // Changed to vertical layout
              className="flex flex-wrap justify-center items-center gap-4"
            >
              {/* To Place */}
              <Form.Item
                name="toPlace"
                label={<span className="text-sm font-medium text-gray-500">To Place</span>}
                rules={[
                  { required: true, message: "Please input your destination in Tamil Nadu!" },
                ]}
                className="w-full sm:w-1/4"
              >
                <AutoComplete
                  options={toPlaceOptions}
                  onSearch={handleToPlaceSearch}
                  placeholder="To place"
                  className="w-full"
                />
              </Form.Item>

              {/* From Date Picker */}
              <Form.Item
                name="startdate"
                label={<span className="text-sm font-medium text-gray-500">Start Date</span>}
                rules={[{ required: true, message: "Please select a From date!" }]}
                className="w-full sm:w-1/6"
              >
                <DatePicker
                  className="w-full"
                  placeholder="Select From Date"
                  format="YYYY-MM-DD"
                  onChange={handleFromDateChange}
                  disabledDate={(current) => current < dayjs().startOf("day")}
                />
              </Form.Item>

              {/* To Date Picker */}
              <Form.Item
                name="enddate"
                label={<span className="text-sm font-medium text-gray-500">End Date</span>}
                rules={[{ required: true, message: "Please select a To date!" }]}
                className="w-full sm:w-1/6"
              >
                <DatePicker
                  className="w-full"
                  placeholder="Select To Date"
                  format="YYYY-MM-DD"
                  disabledDate={disabledToDate}
                  disabled={!fromDate}
                />
              </Form.Item>

              {/* Search Button */}
              <Form.Item className="w-full sm:w-auto self-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: "rgb(74 108 247 / var(--tw-bg-opacity))",
                    borderColor: "rgb(74 108 247)",
                  }}
                  className="w-full sm:w-auto"
                >
                  Search
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      </div>
      {/* Pass the trip duration to InputComponent */}
      <InputComponent tripDays={tripDays} />
    </>
  );
};

export default ExplorePage;