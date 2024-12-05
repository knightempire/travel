"use client";

import { useState, useEffect } from "react";
import { Input, Button, Form, DatePicker } from "antd";
import 'antd/dist/reset.css';
import Breadcrumb from "@/components/Common/Breadcrumb";

const ExplorePage = () => {
  const [form] = Form.useForm();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsPageLoaded(true), 100); // Add a delay to trigger animation
  }, []);

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  return (
    <div
      className={`transition-opacity duration-1000 ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Breadcrumb */}
      <Breadcrumb
        pageName="Travel Search"
        description="Enter your travel details"
      />

      {/* Form Section */}
      <section className="pb-[120px] pt-[40px]">
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
                  message: "Please input your starting place!",
                },
              ]}
              className="w-full sm:w-1/4"
            >
              <Input placeholder="From Place" className="w-full" />
            </Form.Item>

            {/* To Place */}
            <Form.Item
              name="toPlace"
              rules={[
                {
                  required: true,
                  message: "Please input your destination!",
                },
              ]}
              className="w-full sm:w-1/4"
            >
              <Input placeholder="To Place" className="w-full" />
            </Form.Item>

            {/* Date Picker */}
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
              />
            </Form.Item>


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
              >
                Search
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;
