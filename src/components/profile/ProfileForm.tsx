"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProfileForm = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [errors, setErrors] = useState<{
    name?: string;
    age?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);

  const validateName = (value: string): boolean => {
    // More comprehensive name validation
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return value.trim().length >= 2 && nameRegex.test(value);
  };

  const validateAge = (value: string): boolean => {
    const ageNum = parseInt(value);
    return !isNaN(ageNum) && ageNum >= 18 && ageNum < 120;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    if (value && !validateName(value)) {
      setErrors(prev => ({
        ...prev,
        name: "Please enter a valid name (2-50 characters, letters only)"
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
        age: "You must be between 18 and 119 years old"
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
    setIsSubmitting(true);

    const validationErrors: { name?: string; age?: string } = {};

    if (!name) {
      validationErrors.name = "Name is required";
      nameInputRef.current?.focus();
    } else if (!validateName(name)) {
      validationErrors.name = "Invalid name format";
      nameInputRef.current?.focus();
    }

    if (!age) {
      validationErrors.age = "Age is required";
      ageInputRef.current?.focus();
    } else if (!validateAge(age)) {
      validationErrors.age = "Invalid age";
      ageInputRef.current?.focus();
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      console.log("Submitting profile:", { name, age });
      setIsSubmitting(false);
      // Reset form or navigate
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]"
    >
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
            {/* Full Name */}
          </label>
          <motion.div
            animate={errors.name ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <input
              ref={nameInputRef}
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className={`block w-full rounded-sm px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm dark:bg-gray-800 dark:text-white 
                ${errors.name 
                  ? 'border-2 border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-primary focus:border-primary dark:border-gray-700'
                }`}
              placeholder="Enter your full name"
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
            />
          </motion.div>
          <AnimatePresence>
            {errors.name && (
              <motion.p 
                id="name-error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-red-600 dark:text-red-500"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        
        <div className="mb-6">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {/* Age */}
          </label>
          <motion.div
            animate={errors.age ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <input
              ref={ageInputRef}
              type="text"
              id="age"
              value={age}
              onChange={handleAgeChange}
              maxLength={3}
              className={`block w-full rounded-sm px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm dark:bg-gray-800 dark:text-white 
                ${errors.age 
                  ? 'border-2 border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-primary focus:border-primary dark:border-gray-700'
                }`}
              placeholder="Enter your age"
              aria-invalid={!!errors.age}
              aria-describedby="age-error"
            />
          </motion.div>
          <AnimatePresence>
            {errors.age && (
              <motion.p 
                id="age-error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-red-600 dark:text-red-500"
              >
                {errors.age}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        
        <div className="mb-6">
          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!name || !age || !!errors.name || !!errors.age || isSubmitting}
            className={`shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm px-9 py-4 text-base font-medium text-white duration-300 
              ${isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary hover:bg-primary/90'
              } disabled:opacity-50`}
          >
            {isSubmitting ? 'Submitting...' : 'Create Profile'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileForm;