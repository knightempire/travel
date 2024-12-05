"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, Form, DatePicker } from "antd";
import dayjs from "dayjs";
import Breadcrumb from "@/components/Common/Breadcrumb";
import 'antd/dist/reset.css';

const TravelSearchPage: React.FC = () => {
  const [form] = Form.useForm();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    setTimeout(() => setIsPageLoaded(true), 100);
  }, []);

  const onFinish = (values: any) => {
    if (values.startdate && values.enddate) {
      const fromDate = dayjs(values.startdate);
      const toDate = dayjs(values.enddate);
      
      // Calculate the difference in days
      const daysDifference = toDate.diff(fromDate, 'day');
      
      console.log("Form values:", values);
      console.log(`Total trip duration: ${daysDifference + 1} days`);
      console.log(`From: ${fromDate.format('YYYY-MM-DD')} to ${toDate.format('YYYY-MM-DD')}`);
    }
  };

  const handleFromDateChange = (date: dayjs.Dayjs | null) => {
    setFromDate(date);
    form.setFieldsValue({ enddate: null });
  };

  const disabledToDate = (current: dayjs.Dayjs) => {
    return (fromDate && current <= fromDate) || (!fromDate && current < dayjs().startOf('day'));
  };

  return (
    <div
      className={`transition-opacity duration-1000 ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <Breadcrumb 
        pageName="Travel Search" 
        description="Enter your travel details" 
      />

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
                disabledDate={(current) => current < dayjs().startOf('day')}
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
  );
};

export default TravelSearchPage;