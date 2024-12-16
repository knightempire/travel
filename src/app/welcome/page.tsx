'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";

// Define the type for the user data
interface UserData {
  name: string;
  email: string;
  profilePicture: string | null;
  token: string;
}

const WelcomePage = () => {
  // Initialize userData with a type of UserData
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    profilePicture: null,
    token: ''
  });

  useEffect(() => {
    // Get query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const profilePicture = urlParams.get('profilePicture');
    const token = urlParams.get('token');

    // Check if all the data is available
    if (name && email && profilePicture && token) {
      // Save the user data to state
      setUserData({
        name,
        email,
        profilePicture: profilePicture || null, // Ensure profilePicture is either string or null
        token
      });

      // Log the user data to the console
      console.log("User Data:", { name, email, profilePicture, token });
    }
  }, []); // This runs once when the component is mounted

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="my-8">
        {/* Render only if userData is properly populated */}
        {userData.name ? (
          <>
            <h1 className="text-3xl font-bold">Welcome, {userData.name}!</h1>
            <p className="text-lg">Email: {userData.email}</p>
            {/* {userData.profilePicture && (
              <image 
                src={userData.profilePicture} 
                alt="Profile" 
                className="w-24 h-24 rounded-full mt-4" 
              />
            )} */}
            <p className="mt-4">Token: {userData.token}</p>
          </>
        ) : (
          <p>Loading user data...</p>  // Show loading state if data is not yet available
        )}
      </div>
    </section>
  );
};

export default WelcomePage;
