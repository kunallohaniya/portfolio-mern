# MERN Portfolio - Secure, Dynamic, and Stunning 🚀

A full-featured, production-ready portfolio built with the MERN stack (MongoDB, Express, React, Node.js) featuring admin panel, dynamic projects, multilingual support (English/Hindi), Google reCAPTCHA v3 security, and modern UI/UX with Royal Purple + Gold branding.

## ✨ Key Features

### Frontend
- ⚡ **React 18 + Vite** - Lightning-fast development and build
- 🎨 **Tailwind CSS** - Custom Royal Purple (#4A00E0) + Gold (#FFD700) theme
- 🌊 **Framer Motion** - Smooth, professional animations
- 🌐 **Multilingual** - English ↔ Hindi with i18n support (Bhashini ready)
- 🎭 **Theme Modes** - Light / Dark / High Contrast
- 🔒 **reCAPTCHA v3** - Bot protection on forms
- 📱 **Fully Responsive** - Mobile-first design
- ♿ **Accessible** - WCAG compliant
- 🚀 **SEO Optimized** - react-helmet-async, meta tags, structured data

### Backend
- 🛡️ **Security First** - Helmet, CORS, rate limiting, input sanitization
- 🔐 **JWT Auth** - HTTP-only cookies for secure sessions
- 🗄️ **MongoDB + Mongoose** - Robust data modeling
- 📧 **Email Integration** - Nodemailer for notifications
- ✅ **Input Validation** - express-validator on all routes
- 🤖 **reCAPTCHA Server Verification** - Double-layer security
- 📊 **Request Logging** - Comprehensive logging utility
- 🌐 **Auto Sitemap** - `/sitemap.xml` endpoint for SEO

### Portfolio Sections
1. **Hero** - Animated introduction with gradient backgrounds
2. **About Me** - Professional summary with downloadable CV
3. **Skills** - Tech stack showcase with categorization
4. **Projects** - Dynamic projects from MongoDB with filtering
5. **Achievements** - Highlights and milestones
6. **Contact** - Secure form with reCAPTCHA and email notifications
7. **Admin Panel** - Full CRUD operations for projects and contacts

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** v18+ (recommended v20)
- **MongoDB** - Local installation OR MongoDB Atlas account
- **npm** or **yarn**
- *(Optional)* Google reCAPTCHA v3 keys from https://www.google.com/recaptcha/admin
- *(Optional)* Email SMTP credentials (Gmail App Password recommended)

### 📦 Installation

1. **Clone and navigate to project:**
   ```bash
   git clone <your-repo-url>
   cd portfolio-mern
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### 🔧 Environment Configuration

#### Backend Configuration (`backend/.env`)
Create a `.env` file in the `backend/` directory using `.env.example` as template:

```bash
cd backend
cp .env.example .env
```

**Required Variables:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
# For MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

**Optional (but recommended) Variables:**
```env
# Email Configuration (for contact form notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_specific_password

# Google reCAPTCHA v3 (get keys from https://www.google.com/recaptcha/admin)
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Admin Seed Credentials (only used by npm run seed)
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin@123456
ADMIN_USERNAME=admin
```

#### Frontend Configuration (`frontend/.env.local`)
Create a `.env.local` file in the `frontend/` directory:

```bash
cd ../frontend
cp .env.local.example .env.local
```

**Configuration:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
VITE_APP_NAME=Portfolio
VITE_APP_VERSION=1.0.0
```

**Optional:**
```env
# Bhashini API for advanced Hindi translation
VITE_BHASHINI_KEY=your_bhashini_api_key
VITE_BHASHINI_USER_ID=your_user_id
```

### 🗄️ Database Setup & Seeding

**Option 1: Use Seed Script (Recommended for Development)**
```bash
cd backend
npm run seed
```
This creates:
- ✅ Admin user (email: `admin@portfolio.com`, password: `Admin@123456`)
- ✅ 6 sample projects

**Option 2: Manual Setup**
- Start MongoDB locally or use MongoDB Atlas
- Admin user can be created via `/api/auth/register` endpoint

### ▶️ Running the Application

**Development Mode (Recommended):**

1. **Start Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start Frontend Dev Server (in new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

**Production Mode:**
```bash
# Build frontend
cd frontend
npm run build

# Start backend server
cd ../backend
npm start
```

### ✅ Manual Testing & Verification

After starting both servers, verify the following:

#### 1. **Frontend Loads Without Errors**
- Open http://localhost:5173
- Check browser console (F12) - should have no errors
- Verify theme toggle works (Light/Dark/High Contrast)
- Verify language toggle works (EN ↔ हि)

#### 2. **Admin Login**
- Navigate to http://localhost:5173/admin/login
- **Credentials:**
  - Email: `admin@portfolio.com`
  - Password: `Admin@123456`
- Should redirect to `/admin/dashboard` on success

#### 3. **Admin Dashboard - CRUD Operations**
**Create Project:**
- Click "Add New Project"
- Fill in form:
  - Title: `Test Project`
  - Description: `This is a test project for verification`
  - Tech Stack: `React, Node.js, MongoDB`
  - Image URL: `https://via.placeholder.com/400x200`
  - Live Link: `https://example.com`
  - GitHub Link: `https://github.com/example/repo`
  - Featured: ✅
  - Status: `published`
- Click "Save"
- Verify success toast appears

**Edit Project:**
- Click "Edit" on a project
- Modify the title or description
- Click "Save"
- Verify changes appear

**Delete Project:**
- Click "Delete" on a project
- Confirm deletion
- Verify project is removed from list

#### 4. **Projects Page**
- Navigate to home page (http://localhost:5173)
- Scroll to "Projects" section
- Verify projects are fetched from backend and display correctly
- Check that newly created project appears
- Verify tech stack filters work

#### 5. **Contact Form**
- Scroll to "Contact" section
- Fill in form:
  - Name: `Test User`
  - Email: `test@example.com`
  - Subject: `Test Message`
  - Message: `This is a test contact form submission`
- Click "Send Message"
- Verify:
  - Success toast appears
  - If email configured: Check inbox for notification
  - If no email: Check backend logs for contact entry

#### 6. **API Endpoints (via Browser/Postman)**
```bash
# Health Check
GET http://localhost:5000/health

# Get Projects
GET http://localhost:5000/api/projects

# Get Featured Projects
GET http://localhost:5000/api/projects/featured

# Sitemap
GET http://localhost:5000/sitemap.xml
```

### 🔐 Admin Seed Credentials

**Default Admin User:**
- **Email:** `admin@portfolio.com`
- **Password:** `Admin@123456`
- **Username:** `admin`

**⚠️ IMPORTANT:** Change these credentials in production!

To change admin password:
1. Login to admin dashboard
2. (Future feature) Or manually update in MongoDB

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

## 🎨 Custom Branding & Design System

### Color Palette
- **Primary:** `#4A00E0` (Royal Electric Purple)
- **Secondary:** `#8E2DE2` (Gradient Violet)
- **Accent:** `#FFD700` (Gold)
- **Background Light:** `#FFFFFF`
- **Background Dark:** `#0A0A0A`

### Typography
- **Display Font:** Poppins (headings, hero text)
- **Body Font:** Inter (paragraphs, UI elements)
- **Monospace:** JetBrains Mono (code blocks)

### Design Elements
- **Buttons:** Gradient background (#4A00E0 → #8E2DE2) with gold hover glow
- **Cards:** Glassmorphism effect with backdrop blur
- **Animations:** Framer Motion (fade-in, slide-up, scale, hover effects)
- **Shadows:** Purple glow effect on interactive elements
- **Gradients:** Linear gradients for hero sections and CTAs

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