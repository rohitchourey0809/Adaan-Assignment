## Demo Video

[VideoLink  Click Here]https://go.screenpal.com/watch/cZ1ZXRV8jq0



Adani Solutions Backend
This repository contains the backend code for the Adani Solutions project. The backend is built with Node.js, Express, and MongoDB. It includes user authentication with JWT and OTP verification using Twilio.

Features
User registration and login
JWT-based authentication
OTP verification using Twilio
CRUD operations for user profiles
File uploads for profile pictures
Prerequisites
Node.js (v12 or higher)
MongoDB
Twilio account


Getting Started
Clone the Repository

```
git clone https://github.com/rohitchourey0809/Backend-Adaani-Digital

```



API Endpoints


## Auth Routes

- POST /api/register: Register a new user
- POST /api/login: Login a user
- POST /api/send-otp: Send OTP to the user's phone number
- POST /api/verify-otp: Verify the OTP


## User Routes

- GET /api/user: Get the logged-in user's profile
- PUT /api/user: Update the logged-in user's profile
