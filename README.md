# Smart School Management System

## 👨‍💻 Contributors

- Abdi Debela
- Abdi Kumela
- Nahom Zenebe

A modern, full-stack MERN application designed to streamline school administration and enhance the educational experience for administrators, teachers, students, and staff.

![Smart School Management System](frontend/src/assets/logo.png)

## 🌟 Features

- **Multi-role Access**: Different dashboards and permissions for admins, teachers, students, and administrative staff
- **Student Management**: Register, track, and manage student information and academic progress
- **Teacher Management**: Organize teacher assignments, classes, and responsibilities
- **Fee Management**: Monitor and manage student fees, payments, and financial records
- **Timetable System**: Create and manage class schedules and academic calendars
- **Attendance Tracking**: Record and monitor student and teacher attendance
- **Interactive Dashboards**: Data visualization and insights for each user type
- **Modern UI/UX**: Responsive design with animations and seamless user experience
- **Authentication**: Secure role-based authentication system

## 🛠️ Technology Stack

### Frontend
- React.js with hooks for state management
- Redux for global state management
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API requests
- React Hook Form for form handling

### Backend
- Node.js with Express.js
- MongoDB for database
- Mongoose for object modeling
- JWT for authentication
- bcrypt for password hashing
- Nodemailer for email functionality

## 📋 Prerequisites

- Node.js (v14+)
- MongoDB (v4+)
- npm or yarn

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd Smart-School-Management-System
```

### 2. Set up MongoDB
Follow the instructions in [mongodb-installation-guide.md](mongodb-installation-guide.md) to install and set up MongoDB.

### 3. Set up the backend server
```bash
cd server
npm install
npm run create-env  # Creates .env file with necessary configurations
npm run seed        # Creates demo user accounts
npm start           # Starts the backend server
```

### 4. Set up the frontend application
```bash
cd frontend
npm install
npm run dev
```

### 5. Access the application
Open your browser and navigate to http://localhost:5173

## 👥 Demo Accounts

Use these accounts to test different roles in the system:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@school.com | Admin123! |
| Teacher | teacher@school.com | Teacher123! |
| Student | student@school.com | Student123! |
| Administrative | manager@school.com | Manager123! |

## 🏛️ Project Structure

```
Smart-School-Management-System/
├── frontend/                   # React frontend application
│   ├── src/
│   │   ├── assets/             # Static assets (images, fonts)
│   │   ├── components/         # Reusable UI components
│   │   ├── features/           # Redux features/slices
│   │   ├── lib/                # Utility functions and libraries
│   │   ├── pages/              # Page components for different routes
│   │   ├── App.jsx             # Main application component
│   │   └── main.jsx            # Entry point
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration
│
├── server/                     # Node.js backend application
│   ├── controller/             # Route controllers
│   ├── lib/                    # Utility functions and middleware
│   ├── middleware/             # Express middleware
│   ├── model/                  # Mongoose models
│   ├── router/                 # Express routes
│   ├── server.js               # Server entry point
│   └── package.json            # Backend dependencies
│
├── mongodb-installation-guide.md  # MongoDB setup instructions
└── README.md                   # Project documentation
```

## 📱 Features by Role

### Admin Dashboard
- Student and teacher management
- Fee management
- Timetable creation
- System reports and statistics
- User account management

### Teacher Dashboard
- Class management
- Student grading
- Attendance tracking
- Schedule viewing

### Student Dashboard
- Course information
- Grades and academic progress
- Fee status
- Schedule viewing

### Administrative Dashboard
- Fee management
- Attendance records
- System reports
- User account assistance

## 🎨 UI/UX Highlights

- Dark theme with consistent color scheme
- Animated components with Framer Motion
- Responsive design for all screen sizes
- Interactive data visualizations
- Intuitive navigation system

## 🔧 Troubleshooting

If you encounter issues:

1. Make sure MongoDB is running properly
2. Check the connection string in the `.env` file
3. Verify that all dependencies are installed
4. Check console for error messages
5. Refer to `login-troubleshooting-guide.md` for authentication issues

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgements

- Nile Technology for project development
- The MERN stack community for resources and inspiration 
