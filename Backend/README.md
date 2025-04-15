# Realtime Chat Application - Backend

This is the backend code for the **Realtime Chat Application** built using the MERN stack. It provides APIs and WebSocket functionality to enable real-time communication between users.

## Features

- User authentication (JWT-based).
- Real-time messaging using Socket.IO.
- RESTful APIs for user and chat management.
- MongoDB for database storage.
- Secure password handling with bcrypt.

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/swappy-sutar/Realtime-Chat-Application-MERN.git
  cd Realtime-Chat-Application-MERN/Backend
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Create a `.env` file in the root directory and configure the following variables:
  ```env
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```

4. Start the server:
  ```bash
  npm run dev
  ```

## API Endpoints

<!-- ### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login a user.

### Users
- `GET /api/users` - Get all users.

### Chats
- `POST /api/chats` - Create a new chat.
- `GET /api/chats/:id` - Get chat by ID.

### Messages
- `POST /api/messages` - Send a message.
- `GET /api/messages/:chatId` - Get messages for a chat. -->

## Technologies Used

- **Node.js** with **Express.js** for server-side logic.
- **MongoDB** with **Mongoose** for database operations.
- **Socket.IO** for real-time communication.
- **JWT** for authentication.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Repository

[GitHub Repository](https://github.com/swappy-sutar/Realtime-Chat-Application-MERN.git)