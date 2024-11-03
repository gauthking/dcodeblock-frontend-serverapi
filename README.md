# Admin Dashboard Application - Backend Server API

This is the backend API for the Dashboard Application, built using Express.js, TypeScript, and MongoDB to handle user management, authentication, and activity tracking.

**API BASE URL**: [https://dcodeblock-frontend-serverapi.onrender.com](https://dcodeblock-frontend-serverapi.onrender.com)

**Frontend Client Repository**: [https://github.com/gauthking/dcodeblock-frontend-client](https://github.com/gauthking/dcodeblock-frontend-client)

## Project Setup

To set up the project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/gauthking/dcodeblock-frontend-serverapi.git
   ```
2. **Navigate into the Project Directory**
```bash
cd dcodeblock-frontend-serverapi
```

3. **Install Dependencies**
   ```bash
   npm install
   ```


### Environment Variables

Create a .env file in the root directory and add the following environment variables

```bash
MONGODB_URL="mongodb+srv://appskans2017:KScAQsZQgX835Our@cluster0.nws7y.mongodb.net/userDB?retryWrites=true&w=majority&appName=Cluster0"
```

### Dependencies

Major dependencies include:

- Express: A web framework for Node.js.
- TypeScript: For static typing.
- Mongoose: MongoDB object modeling.
- bcryptjs: For password hashing.
- jsonwebtoken: For JWT token creation and verification.

### Running the Server

Start the server in development mode: (runs on localhost 8001)

```bash
npm run start
```


### API Endpoints

### User Authentication & Management

| Method | Endpoint                | Description                            | Request Body                                                                 |
|--------|--------------------------|----------------------------------------|------------------------------------------------------------------------------|
| POST   | `/api/user/signup`       | Registers a new user                   | `{ "userName": "string", "userEmail": "string", "hashedPassword": "string" }`|
| POST   | `/api/user/login`        | Authenticates a user and returns a JWT | `{ "userEmail": "string", "password": "string" }`                            |
| GET    | `/api/user/getAllUsers`  | Retrieves all users                   | None                                                                         |

### Admin Management

| Method | Endpoint                    | Description                    | Request Body                                                                                                        |
|--------|------------------------------|--------------------------------|---------------------------------------------------------------------------------------------------------------------|
| POST   | `/api/admin/create`          | Creates a new user (admin)     | `{ "userName": "string", "userEmail": "string", "password": "string", "role": "string", "requestingUserEmail": "string" }` |
| PUT    | `/api/admin/update/:id`      | Updates user details by ID     | `{ "userName": "string", "userEmail": "string", "password": "string", "role": "string", "requestingUserEmail": "string" }` |
| GET    | `/api/admin/user/:id`        | Retrieves user details by ID   | None                                                                                                               |
| POST   | `/api/admin/delete/:id`      | Deletes a user by ID (admin)   | `{ "requestingUserEmail": "string" }`                                                                              |
| POST   | `/api/admin/action`          | Logs an admin action           | `{ "requestingUserEmail": "string", "action": "string" }`                                                          |




