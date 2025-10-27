# MERN Portfolio - Secure, Dynamic, and Stunning

A full-featured portfolio built with the MERN stack (MongoDB, Express, React, Node.js) featuring admin panel, dynamic projects, multilingual support, and modern UI/UX.

## 🌟 Features

### Frontend
- React 18 + Vite for fast development
- Tailwind CSS for responsive styling
- Framer Motion for smooth animations
- React Router DOM for navigation
- Axios for API calls
- React Hook Form & Yup for form validation
- Toastify for notifications
- EmailJS + Google reCAPTCHA v3 for contact form
- Bhashini API for English ↔ Hindi translation
- Lucide React icons
- Theme modes: Light / Dark / High Contrast

### Backend
- Node.js + Express server
- MongoDB with Mongoose ODM
- JWT authentication with bcrypt password hashing
- Protected routes with role-based access control
- Helmet, CORS, and rate limiting for security
- Google reCAPTCHA v3 verification
- MongoDB Atlas integration
- Email notifications with Nodemailer

### Portfolio Sections
1. **Home/Hero** - Animated introduction
2. **About Me** - Professional summary with resume
3. **Projects** - Dynamic projects from MongoDB
4. **Skills** - Technical skills showcase
5. **Contact** - Secure contact form with reCAPTCHA
6. **Admin Panel** - Secure login with CRUD operations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Environment Setup

#### Backend (.env)
```env
NODE_ENV=development
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173

# Email configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# reCAPTCHA v3
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

#### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5001/api
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd portfolio-mern
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Install frontend dependencies:**
```bash
cd ../frontend
npm install
```

4. **Install root dependencies:**
```bash
cd ..
npm install
```

### Running the Application

#### Development Mode
```bash
# Run both frontend and backend concurrently
npm run dev

# Run frontend only
npm run dev:frontend

# Run backend only
npm run dev:backend
```

#### Production Mode
```bash
# Build frontend
npm run build

# Start backend server
npm start
```

## 🛠️ Project Structure

```
portfolio-mern/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.local
│   └── package.json
└── package.json
```

## 🔐 Security Features

- JWT authentication with secure HTTP-only cookies
- Password hashing with bcrypt (12 rounds)
- Helmet for HTTP header security
- CORS configuration for trusted origins
- Rate limiting to prevent abuse
- Input validation and sanitization
- MongoDB injection prevention
- XSS protection

## 🎨 Custom Branding

- **Primary:** `#4A00E0` (Royal Electric Purple)
- **Secondary:** `#8E2DE2` (Gradient Violet)
- **Accent:** `#FFD700` (Gold)
- **Light BG:** `#FFFFFF`
- **Dark BG:** `#0A0A0A`
- **High Contrast:** Black + Yellow text
- Fonts: "Poppins" + "Inter"
- Buttons: Gradient (purple → violet) with gold hover outline
- Animations: Smooth fade, parallax scroll, hover scale
- Glassmorphism cards for projects & services

## 📱 Responsive Design

- Mobile-first approach
- Flexbox and Grid layouts
- Media queries for all device sizes
- Touch-friendly navigation
- Optimized images and assets

## 🌍 Multilingual Support

- English ↔ Hindi translation
- Bhashini API integration
- Language toggle in UI
- RTL support for Hindi

## 🧪 Testing

- Unit tests with Jest
- Integration tests with Supertest
- End-to-end tests with Cypress (planned)

## 🚀 Deployment

### Frontend
- Vercel (recommended)
- Netlify
- GitHub Pages

### Backend
- Render
- Railway
- Heroku

### Environment Variables for Production
Ensure all environment variables are set in your deployment platform.

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register admin (setup only)
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Projects
- `POST /api/projects` - Create project (admin only)
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin only)
- `GET /api/contact/:id` - Get contact by ID (admin only)
- `PUT /api/contact/:id` - Update contact status (admin only)
- `DELETE /api/contact/:id` - Delete contact (admin only)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)