REST API Project
A REST API developed using Node.js, Express, MySQL, and Sequelize. This API includes features for user authentication (registration and login), task management, and real-time chat functionality. It's designed to support dashboards for users, task management, and real-time communication.

Table of Contents

Features
Tech Stack
Getting Started
Installation
Environment Variables
Running the API
API Endpoints
Usage
Contributing

Features
User Authentication: Login and registration.
Dashboard: Access your personalized dashboard after logging in.
Task Management: Add, update, delete, and view tasks.
Real-Time Chat: Enables real-time messaging using WebSockets.

Tech Stack

Backend: Node.js, Express.js
Database: MySQL
ORM: Sequelize
Real-Time Communication: WebSocket or Socket.io

1 Getting Started

2 Prerequisites
Node.js (version 14.x or higher)
MySQL

3 Installation
Clone the repository: 

 4 Install dependencies:
npm install

 5 Environment Variables
Set up environment variables by creating a .env file in the root directory. Configure it as follows:
# Server settings
PORT=5000

# Database settings
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdbname

# Authentication settings
JWT_SECRET=your_jwt_secret

6 Running the API
npm start

  7 API Endpoints

8 Authentication

Register: POST /createuser

Login: POST /login

9 Dashboard

Post Dashboard:Post /todoList

Get Dashboard: GET /getAllToDo

Post Dashboard: Post /assign/:todoId

10 Task Management

Update Task: PUT Updateatodo/:id

Delete Task: DELETE /deleteTodo/:id

11 Chat
Send Messages and Receive:
GET /messages/:userId/:chatPartnerId

12 Usage
You can test the API endpoints using tools like Postman or Insomnia. Make sure to set up authorization headers (e.g., Bearer Token) when accessing protected routes
