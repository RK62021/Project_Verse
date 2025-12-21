# Project_Verse

Project_Verse is a student innovation showcase platform where students can publish their academic and technical projects, and get discovered by peers, mentors, and industry professionals. Built with modern web technologies and Docker for scalable deployment.

## 🚀 Features

- **User Authentication**: Secure sign-up and sign-in with JWT-based authentication
- **Project Management**: Upload, view, and manage your projects with rich details
- **User Profiles**: Customizable profiles with avatar uploads
- **Project Discovery**: Browse and explore projects from other students
- **Image Upload**: Cloudinary integration for seamless image storage
- **Responsive Design**: Modern UI built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication tokens
- **Cloudinary** - Image storage and management
- **Multer** - File upload handling
- **bcrypt** - Password hashing

### DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📁 Project Structure

```
Project_Verse/
├── Client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── services/      # API service functions
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── package.json       # Frontend dependencies
│
├── Server/                 # Backend Node.js application
│   ├── controllers/       # Request handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middlewares/       # Express middlewares
│   ├── utils/             # Utility functions
│   ├── config/            # Configuration files
│   └── package.json       # Backend dependencies
│
├── docker-compose.yml     # Docker Compose configuration
└── README.md              # Project documentation
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for containerized deployment)
- **MongoDB** (if running locally without Docker)
- **Cloudinary account** (for image storage)

## 🔧 Installation

### Option 1: Using Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Project_Verse
   ```

2. **Set up environment variables**

   Create a `.env` file in the `Server/` directory:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start the application**

   ```bash
   docker-compose up --build
   ```

   The application will be available at:

   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

### Option 2: Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Project_Verse
   ```

2. **Install backend dependencies**

   ```bash
   cd Server
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../Client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `Server/` directory (see environment variables above).

5. **Start the backend server**

   ```bash
   cd Server
   npm run dev
   ```

6. **Start the frontend development server** (in a new terminal)
   ```bash
   cd Client
   npm run dev
   ```

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/signout` - Sign out user

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create a new project (protected)
- `PUT /api/projects/:id` - Update a project (protected)
- `DELETE /api/projects/:id` - Delete a project (protected)

### Profile

- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile` - Update user profile (protected)
- `POST /api/profile/avatar` - Upload avatar (protected)

## 🚦 Running the Application

### Development Mode

**With Docker:**

```bash
docker-compose up
```

**Without Docker:**

```bash
# Terminal 1 - Backend
cd Server
npm run dev

# Terminal 2 - Frontend
cd Client
npm run dev
```

### Production Build

**Frontend:**

```bash
cd Client
npm run build
```

**Backend:**

```bash
cd Server
npm start
```

## 🔐 Environment Variables

Create a `.env` file in the `Server/` directory with the following variables:

| Variable                | Description                          | Required           |
| ----------------------- | ------------------------------------ | ------------------ |
| `PORT`                  | Backend server port                  | No (default: 3000) |
| `MONGODB_URI`           | MongoDB connection string            | Yes                |
| `JWT_SECRET`            | Secret key for JWT tokens            | Yes                |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                | Yes                |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                   | Yes                |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret                | Yes                |
| `NODE_ENV`              | Environment (development/production) | No                 |
| `FRONTEND_URL`          | Frontend URL for CORS                | Yes                |

## 📝 Available Scripts

### Frontend (Client)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (Server)

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Raunak kumar
- Dhruv Soni
- Sanju

## 🙏 Acknowledgments

- Built with modern web technologies
- Thanks to all contributors and the open-source community
