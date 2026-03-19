# Artfolio

A fullstack art gallery app
Built with React, Node/Express, and MongoDB.

## Features

- Browse and search artworks by title or artist
- Artwork detail modal with full resolution view
- Admin dashboard — add, update, delete artworks
- JWT authentication with protected routes
- Responsive design with dark mode

## Tech Stack

**Client** — React, Tailwind CSS, Axios  
**Server** — Node.js, Express, MongoDB, Mongoose  
**Auth** — JWT, bcrypt  
**Tests** — Vitest, React Testing Library

## Getting Started

**Prerequisites** — Node.js, MongoDB Atlas account

**Clone the repo**
git clone https://github.com/qquazld/artfolio.git

**Install dependencies**
cd client && npm install
cd server && npm install

**Environment variables**

client/.env
VITE_API_URL=http://localhost:3000/api/art
VITE_API_BASE_URL=http://localhost:3000/api

server/.env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

**Run the app**
cd server && node index.js
cd client && npm run dev
