HomeCarePro – Cleaning Service Platform

HomeCarePro is a full-stack web application for managing home cleaning service bookings.
It includes a customer booking form, admin dashboard, cleaner registration, and secure authentication.

Technologies Used
Frontend

React (Vite)

React Router DOM

Tailwind / Custom CSS

Backend

Node.js + Express

MongoDB + Mongoose

JSON Web Token (JWT)

CORS

Project Structure
homecarepro/
│
├── backend/
│ ├── server.js
│ ├── models/
│ ├── controllers/
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── index.html
│ ├── .env
│ ├── package.json
│ └── vite.config.js
│
└── README.md

Environment Variables

Create a .env file inside backend/:

PORT=4000
MONGODB_URI=your_mongodb_connection_string
ADMIN_EMAIL=admin@homecarepro.com
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=super_secret_key

Optional .env inside frontend/:

VITE_API_URL=http://localhost:4000

Running the Project Locally

1. Backend
   cd backend
   npm install
   npm start

Backend runs on:

http://localhost:4000

2. Frontend
   cd frontend
   npm install
   npm run dev

Frontend runs on:

http://localhost:5173

Admin Login

Access admin login:

http://localhost:5173/admin/login

Credentials come from .env.

Features
Customer Features

Book cleaning services

View service details

Fully responsive UI

Admin Features

Secure login using JWT

View all bookings

Update booking status

Assign cleaners

View registered cleaners

Cleaner Features

Public cleaner registration form

Cleaner data saved to MongoDB

API Endpoints
Auth

POST /api/admin/login

Bookings

POST /api/bookings
GET /api/bookings
PATCH /api/bookings/:id

Cleaners

POST /api/cleaners/apply
POST /api/cleaners
GET /api/cleaners

Deployment

Frontend can be deployed on:

Vercel

Netlify

GitHub Pages

Backend can be deployed on:

Render

Railway

DigitalOcean

AWS EC2

Contributing

Pull requests are welcome.
For major changes, open an issue first.

License

MIT License
