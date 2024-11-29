# Travel Recommendation System & Trip Planning Platform

Welcome to the **Travel Recommendation System** project! This platform helps users plan their trips by recommending destinations, activities, and experiences based on personalized preferences. The system leverages machine learning (ML) models for recommendations and integrates a seamless itinerary planning experience.

This project is a full-stack application built with **Next.js**, **TypeScript**, **Node.js**, **Firebase**, and **Machine Learning** (using Jupyter Notebooks).


## Features

- **Personalized Travel Recommendations**: AI-powered suggestions for destinations and activities based on user preferences.
- **User Profiles & Preferences**: Users can create accounts, save their preferences, and receive tailored recommendations.
- **Itinerary Management**: Plan and manage trip itineraries, with the ability to add activities, dates, and notes.
- **Reviews & Ratings**: Access detailed reviews, ratings, and photos of destinations and activities.
- **Travel Predictions** (coming soon): Predict travel trends, best times to visit, and cost forecasts.
- **Booking Integration**: Integration with booking services for flights, hotels, and activities (optional).

## Tech Stack

### Frontend
- **Next.js**: A React-based framework that supports server-side rendering (SSR) and static site generation (SSG).
- **TypeScript**: Adds type safety and better development experience.
- **Tailwind CSS / Bootstrap**: Tailwind for utility-first styling or Bootstrap for prebuilt UI components.
- **React**: JavaScript library for building user interfaces with components.

### Backend
- **Node.js**: Server-side JavaScript runtime for handling backend logic and API endpoints.
- **Express.js**: Web framework for building RESTful APIs.
- **Firebase**: For user authentication (Firebase Auth), real-time database (Firestore), and hosting.

### Machine Learning (ML)
- **Jupyter Notebook**: For building, training, and testing machine learning models.
- **Python**: ML development using libraries like **Scikit-learn**, **TensorFlow**, **PyTorch**, etc.
- **Pandas & NumPy**: For data manipulation and preprocessing.


## Branches

This repository contains the following branches:

- **main**: Initial branch, contains no code.
- **ml**: Dedicated to machine learning development and Jupyter Notebooks.
- **frontend**: Contains the frontend code built with Next.js and TypeScript.
- **backend**: Contains the backend code for API development using Node.js and Express.


## Installation and Setup

### Prerequisites
Before running this project locally, make sure you have the following installed:

- **Node.js** 
- **Yarn** or **npm**
- **Python** for ML development in Jupyter Notebook

### 1. Clone the repository
```bash
git clone https://github.com/knightempire/travel.git
cd travel

```
### 2. Install Dependencies for the Frontend (Next.js)

Navigate to the **frontend** directory and install the required dependencies using **npm** or **yarn**:

```bash
# Navigate to the frontend directory 
cd frontend

# Install frontend dependencies
npm install
# or if you prefer yarn
yarn install
```

### 3.  Install Dependencies for the Backend (Node.js / Express)

Next, navigate to the backend directory and install the necessary dependencies for the backend:

```bash
# Navigate to the backend directory
cd backend

# Install backend dependencies
npm install
# or if you prefer yarn
yarn install
```

### 4. Running the Project

#### Switching Branch and Pulling Latest Changes

To ensure you're on the correct branch and get the latest changes, follow these steps:

1. **Switch to the `frontend` branch**:
    ```bash
    git checkout frontend
    ```

2. **Pull the latest changes from the remote repository**:
    ```bash
    git pull
    ```

#### Frontend (Next.js)

Once the dependencies are installed, you can run the frontend development server using Next.js:

1. **Navigate to the frontend directory** (if you're not already in it):
    ```bash
    cd frontend
    ```

2. **Run the Next.js development server**:
    ```bash
    npm run dev
    ```
    
3. **To test the production build**, you can run:
    ```bash
    npm run build
    ```
    This will build the Next.js project for production.

4. **To start the production server** after building the project:
    ```bash
    npm start
    ```



#### Pushing Code Changes

To push your code changes to the remote repository, follow these steps:

1. **Add the changes**:
    ```bash
    git add .
    ```

2. **Commit the changes with a message**:
    ```bash
    git commit -m "message here"
    ```

3. **Push the changes to the remote repository**:
    ```bash
    git push
    ```

---

## License

This project is licensed under the **GNU General Public License (GPL)**. See the LICENSE file for details.
