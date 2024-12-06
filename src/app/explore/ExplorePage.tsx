"use client";
import React, { useState, useEffect } from "react";
import { Button, Form, DatePicker, AutoComplete, message } from "antd";
import dayjs from "dayjs";
import Breadcrumb from "@/components/Common/Breadcrumb";
import 'antd/dist/reset.css';
import InputComponent from "@/components/input/input";
interface City {
  name: string;
  // Add other properties as needed
}

// Constants for location
const COUNTRY = {
  name: 'India',
  code: 'IN'
};

const STATE = {
  name: 'Tamil Nadu',
  code: 'TN'
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

  // API configuration
  const API_KEY = 'YzZJOGF3STBZM3VtNmxHUDBUcmI3Wm90RVZoUWRoVlBRekd6WERzZA==';
  const API_BASE_URL = 'https://api.countrystatecity.in/v1';

  useEffect(() => {
    // Fetch Tamil Nadu districts on component mount
    fetchTamilNaduDistricts();
    setTimeout(() => setIsPageLoaded(true), 100);
  }, []);

  const fetchTamilNaduDistricts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/countries/${COUNTRY.code}/states/${STATE.code}/cities`, {
        headers: {
          "X-CSCAPI-KEY": API_KEY
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch districts');
      }

      const data: City[] = await response.json();
      
      // Ensure all items are strings and create unique districts
      const districts = Array.from(
        new Set(
          data
            .map((city) => city.name)
            .filter((name): name is string => typeof name === 'string')
        )
      );

      setAllDistricts(districts);
    } catch (error) {
      console.error('Error fetching districts:', error);
      message.error('Failed to load districts. Please try again.');
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
        .filter(district => 
          district.toLowerCase().includes(value.toLowerCase())
        )
        .map(district => ({ value: district }));
      
      setFromPlaceOptions(suggestions);
    } else {
      setFromPlaceOptions([]);
    }
  };

  const handleToPlaceSearch = (value: string) => {
    if (value.length > 0) {
      // Filter districts based on input
      const suggestions = allDistricts
        .filter(district => 
          district.toLowerCase().includes(value.toLowerCase())
        )
        .map(district => ({ value: district }));
      
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
        className={`transition-opacity duration-1000 ${
          isPageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Breadcrumb
          pageName="Travel Search"
          description={`Enter your travel details in ${STATE.name}, ${COUNTRY.name}`}
        />

        <section className="pt-[40px]">
          <div className="container mx-auto px-4">
            <Form
              form={form}
              onFinish={onFinish}
              layout="inline"
              className="flex flex-wrap justify-center items-center gap-4"
            >
              {/* From Place */}
              <Form.Item
                name="fromPlace"
                rules={[
                  {
                    required: true,
                    message: "Please input your starting place in Tamil Nadu!",
                  },
                ]}
                className="w-full sm:w-1/4"
              >
                <AutoComplete
                  options={fromPlaceOptions}
                  onSearch={handleFromPlaceSearch}
                  placeholder="From Place"
                  className="w-full"
                />
              </Form.Item>

              {/* To Place */}
              <Form.Item
                name="toPlace"
                rules={[
                  {
                    required: true,
                    message: "Please input your destination in Tamil Nadu!",
                  },
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
                rules={[
                  {
                    required: true,
                    message: "Please select a From date!",
                  },
                ]}
                className="w-full sm:w-1/6"
              >
                <DatePicker
                  className="w-full"
                  placeholder="Select From Date"
                  format="YYYY-MM-DD"
                  onChange={handleFromDateChange}
                  disabledDate={(current) =>
                    current < dayjs().startOf("day")
                  }
                />
              </Form.Item>

              {/* To Date Picker */}
              <Form.Item
                name="enddate"
                rules={[
                  {
                    required: true,
                    message: "Please select a To date!",
                  },
                ]}
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
              <Form.Item className="w-full sm:w-auto">
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