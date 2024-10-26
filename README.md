# Book Store

A simple and efficient Book Store application built with NestJS, MongoDB, and Docker. This application allows users to
manage books, authors, and genres effectively.

## Features

- **Book Management**: Create, read, update, and delete books.
- **Pagination**: Fetch books with pagination support.
- **Filtering**: Filter books by author and genre.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **MongoDB**: A NoSQL database used to store book, author, and genre data.
- **Docker**: Containerization tool to simplify deployment and manage dependencies.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- Docker (for running the application in containers)
- MongoDB (for local development)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dev-muyiwa/book-store.git
   cd book-store
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and set up the necessary environment variables. Here’s a sample:

   ```plaintext
   APP_NAME=BookStore
   JWT_ACCESS_SECRET=secret
   JWT_REFRESH_SECRET=secret
   NODE_ENV=local
   PORT=3003
   MONGO_URI=mongodb://localhost:27017/bookstore
   ```

### Running the Application

#### Using Docker

1. Build the Docker image:

   ```bash
   docker-compose up --build
   ```

2. Access the application at `http://localhost:3003`.

#### Running Locally

1. Run the application using npm:

   ```bash
   npm run start:pro
   ```

2. Access the application at `http://localhost:3003`.

## Postman Documentation

You can access the Postman documentation for this project [here](https://documenter.getpostman.com/view/27609993/2sAY4sjPrs).
