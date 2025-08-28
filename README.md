# blog-api

Traditional blog platforms often tightly couple the content management system with the public-facing blog, creating security vulnerabilities and limiting flexibility. Content creators need separate, secure environments for writing and publishing content compared to reading and commenting on it, while maintaining a unified backend that serves both interfaces efficiently.

This project solves these challenges by:

* **Separating concerns:** Distinct frontends for content creation vs. content 
* **Enhanced security:** Protected admin interface isolated from public blog
* **API-first approach:** Flexible backend that can serve multiple clients
* **Modern authentication:** JWT-based security with role-based access control
* **Scalable architecture:** Modular design allowing independent scaling of components

Check out my [blog-api](https://blog-api-view.netlify.app/)!

This blog-api project was built as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api) curriculum.

***

## Features

### Backend API

* RESTful API built with Express.js and Prisma ORM
* JWT Authentication for secure user sessions
* Role-based access control (Authors vs. Readers)
* Draft/Published post management
* Comment system with user ownership
* Protected routes for content management

### Reader Frontend

* Public blog interface for viewing content
* User registration/login for commenting
* Comment management (edit/delete own comments)
* Real-time content updates

### Author Frontend

* Admin dashboard for content creators
* Draft management with publish/unpublish controls
* Comment moderation (manage all comments)
* Post management tools (create/edit/delete posts)

## Tech Stack

### Backend

* Node.js with Express.js framework
* Prisma ORM with PostgreSQL database
* JSON Web Tokens (JWT) for authentication
* bcrypt for password hashing
* CORS for cross-origin resource sharing

### Frontend

* React 18 with modern hooks
* Vite for fast development and building
* React Router for client-side routing
* CSS in JS for styling

## Installation

1. Clone the repository: `git clone git@github.com:Meltasy/blog-api.git` and `cd blog-api`
2. Set up the backend: `cd backend` and `npm install`
3. Configure environment variables with an `.env` file in the root directory:
    * `DATABASE_PUBLIC_URL="your-database-url"`
    * `JWT_SECRET="your-secret-key"`
    * `AUTHOR_PASSCODE="your-author-passcode"`
4. Set up the database: `npx prisma migrate dev`
5. Start the backend server: `npm run dev`
6. Set up the reader frontend: `cd ../frontend-view` and `npm install` and `npm run dev`
7. Set up the author frontend: `cd ../frontend-author` and `npm install` and `npm run dev`

## Future Improvements

* Rich text editor for posts
* Image uploads for posts
* Post analytics for author

## License

This entire project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.