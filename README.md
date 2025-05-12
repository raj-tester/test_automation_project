# Test Automation Project

A simple full-stack authentication app with the following features:

- User Sign Up
- User Login
- User Logout

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js + Express (REST API)
- **Database:** JSON file (for user data persistence)

## Project Structure
```
.
├── client/         # React frontend
├── server/         # Express backend
├── README.md       # Project documentation
```

## Features
- User registration with email and password
- Secure login and logout
- Session management using HTTP-only cookies
- User data stored in a local JSON file

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Setup

#### 1. Clone the repository
```
git clone https://github.com/raj-tester/test_automation_project.git
cd test_automation_project
```

#### 2. Install dependencies

##### Backend
```
cd server
npm install
```

##### Frontend
```
cd ../client
npm install
```

#### 3. Run the app

##### Start the backend
```
cd server
npm start
```

##### Start the frontend
```
cd ../client
npm start
```

The React app will be available at `http://localhost:3000` and the API at `http://localhost:5001`.

## License
MIT 