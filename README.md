# <img src="https://i.imgur.com/56G0Rat.png" alt="ExploreIQ Logo" width="380" />  <br> ExploreIQ  <br> - Travel Recommendation System & Trip Planning Platform

Welcome to **ExploreIQ**! This platform helps users plan their trips by recommending destinations, activities, and experiences based on personalized preferences. The system leverages machine learning (ML) models for recommendations and integrates a seamless itinerary planning experience.

---



### Logo:
1. **Logo with Text**  
   ![ExploreIQ Logo with Text](https://i.imgur.com/56G0Rat.png)  
   URL: [ExploreIQ Logo with Text](https://i.imgur.com/56G0Rat.png)

2. **Logo without Text**  
   ![ExploreIQ Logo without Text](https://i.imgur.com/0CiG9sS.png)  
   URL: [ExploreIQ Logo without Text](https://i.imgur.com/0CiG9sS.png)


## Features

- **API Development**: Provides RESTful API endpoints for frontend communication.
- **User Authentication**: Secure user registration and login using Firebase Authentication.
- **Database Integration**: Real-time data storage and retrieval using Firebase Firestore.
- **Scalable Architecture**: Built for scalability and performance.

## Tech Stack

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building robust RESTful APIs.
- **Firebase**:
  - **Authentication**: For secure user login and registration.
  - **Firestore**: Real-time database for storing user and application data.

## Installation and Setup

### Prerequisites

- **Node.js** 
- **Yarn** or **npm**
- Firebase project credentials (Firebase Admin SDK key).

### 1. Clone the Repository

```bash
git clone https://github.com/knightempire/travel.git
cd travel/backend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Backend Server

Start the backend server using the following command:

```bash
node app.js
```

The API will be available at `http://localhost:5000` (or your configured port).

## Directory Structure

- **routes/**: API route definitions.
- **controllers/**: Business logic for handling API requests.
- **models/**: Data models for interacting with Firestore.
- **middleware/**: Custom middleware for authentication and error handling.

## License

This module is licensed under the **GNU General Public License (GPL)**. See the LICENSE file for details.
