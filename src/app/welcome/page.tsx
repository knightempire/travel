import { useEffect, useState } from 'react';

const WelcomePage = () => {
  const [userData, setUserData] = useState(null);

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
        profilePicture,
        token
      });
      
      // Log the user data to the console
      console.log("User Data:", { name, email, profilePicture, token });
    }
  }, []); // This runs once when the component is mounted

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userData.name}!</h1>
      <p>Email: {userData.email}</p>
      <img src={userData.profilePicture} alt="Profile" width="100" height="100" />
      <p>Token: {userData.token}</p>
    </div>
  );
};

export default WelcomePage;
