// D:\project\sample\travel\src\components\profile\ProfileForm.tsx
"use client";
import React, { useState } from "react";

const ProfileForm = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [errors, setErrors] = useState<{
    name?: string;
    age?: string;
  }>({});

  const validateName = (value: string): boolean => {
    return value.trim().length >= 2;
  };

  const validateAge = (value: string): boolean => {
    const ageNum = parseInt(value);
    return !isNaN(ageNum) && ageNum > 0 && ageNum < 120;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    if (value && !validateName(value)) {
      setErrors(prev => ({
        ...prev,
        name: "Please enter a valid name (at least 2 characters)"
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        name: undefined
      }));
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setAge(value);

    if (value && !validateAge(value)) {
      setErrors(prev => ({
        ...prev,
        age: "Please enter a valid age (1-119)"
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        age: undefined
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: { name?: string; age?: string } = {};

    if (!name) {
      validationErrors.name = "Name is required";
    } else if (!validateName(name)) {
      validationErrors.name = "Invalid name format";
    }

    if (!age) {
      validationErrors.age = "Age is required";
    } else if (!validateAge(age)) {
      validationErrors.age = "Invalid age";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Submitting profile:", { name, age });
    // Add your form submission logic here
  };

  return (
    <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
      <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
        Create Your Profile
      </h3>
      <p className="mb-11 text-center text-base font-medium text-body-color">
        Complete your profile to personalize your travel experience
      </p>
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className={`block w-full rounded-sm px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm dark:bg-gray-800 dark:text-white 
              ${errors.name 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-primary focus:border-primary dark:border-gray-700'
              }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.name}
            </p>
          )}
        </div>
        
        <div className="mb-6">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Age
          </label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={handleAgeChange}
            maxLength={3}
            className={`block w-full rounded-sm px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm dark:bg-gray-800 dark:text-white 
              ${errors.age 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-primary focus:border-primary dark:border-gray-700'
              }`}
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.age}
            </p>
          )}
        </div>
        
        <div className="mb-6">
          <button 
            type="submit" 
            className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90 disabled:opacity-50"
            disabled={!name || !age || !!errors.name || !!errors.age}
          >
            Create Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;