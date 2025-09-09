# blog-api

[![License ISC](https://img.shields.io/github/license/Meltasy/blog-api)](https://opensource.org/license/isc-license-txt)
[![ECMAScript](https://img.shields.io/badge/ECMAScript-2025-blue.svg)](https://ecma-international.org/publications-and-standards/standards/ecma-262/)
[![Node.js](https://img.shields.io/badge/Node.js-v22.12.0-brightgreen.svg)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-v11.3.0-red.svg)](https://www.npmjs.com/)
[![Repo Size](https://img.shields.io/github/repo-size/Meltasy/blog-api)](https://github.com/Meltasy/blog-api)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://blog-api-view.netlify.app/)

A blog platform with a backend API supporting a public site for readers and a private dashboard for authors.

This project was built as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api) curriculum.

Check out my [Blog App](https://blog-api-view.netlify.app/)!

## Features

* 🎎 **Dual-purpose design:** Clean Separation between content creation dashboard and public blog
* 🔐 **Smart access control:** Role-based permissions keep admin functions secure from readers
* 📝 **Full content lifecycle:** Draft, edit, publish and manage posts with complete workflow control
* 💬 **Engaging comment system:** User accounts, threaded discussions, and self-managed comments
* 🧩 **Scalable architecture:** Modular components that grow independently as needed
* 📢 **Live updates:** Real-time content sync keeps everything fresh and responsive
* 🔒 **Enhanced security:** Protected routes and authenticated sessions throughout

## Future Improvements

* Rich text editor for posts
* Image uploads for posts
* Post analytics for author

## Tech Stack

### Backend

* Node.js with Express.js framework
* Prisma ORM with PostgreSQL database
* JSON Web Tokens (JWT) for authentication
* bcrypt for password hashing
* CORS for cross-origin resource sharing

### Frontends

* React 18 with modern hooks
* Vite for fast development and building
* React Router for client-side routing
* CSS in JS for styling

## Local Installation

Prerequisite: Node.js v22.19.0

1. Clone the repository: `git clone git@github.com:Meltasy/blog-api.git` and `cd blog-api`
2. Set up the backend: `cd backend` and `npm install`
3. Configure environment variables with an `.env` file in the root directory:
    * `DATABASE_PUBLIC_URL="your-database-url"`
    * `JWT_SECRET="your-secret-key"`
    * `AUTHOR_PASSCODE="your-author-passcode"`
    * `PORT="your-backend-port"`
4. Set up the database: `npx prisma migrate dev`
5. Set up the reader frontend: `cd ../frontend-view` and `npm install`
6. Configure environment variable with an `.env` file in the root directory:
    * `VITE_API_URL="your-backend-port"`
    * `VITE_AUTHOR_URL="your-frontend-author-port"`
7. Set up the author frontend: `cd ../frontend-author` and `npm install`
8. Configure environment variable with an `.env` file in the root directory:
    * `VITE_API_URL="your-backend-port"`
    * `VITE_VIEW_URL="your-frontend-view-port"`
9. Start the backend and both frontend servers: `npm run dev`

## License

This entire project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.