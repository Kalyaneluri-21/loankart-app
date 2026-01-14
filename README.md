# LoanKart - Loan Management System

deployed Link: https://loankart-app.vercel.app/

A full-stack MERN application for loan applications, management, and payment tracking with role-based authentication.

## 🚀 Features

### User Features
- **Authentication**: Secure login/signup with JWT tokens
- **Password Reset**: Email-based password recovery
- **Loan Application**: Multi-step loan application form
- **Dashboard**: View loan status and payment history
- **Payment Tracking**: EMI calendar and payment processing
- **Loan Types**: Personal, Home, Education, Business loans

### Admin Features
- **Admin Dashboard**: Manage all loan applications
- **User Management**: View all registered users
- **Loan Approval**: Approve/reject loan applications
- **Analytics**: Loan statistics and insights

### Technical Features
- **Role-based Access**: User and Admin roles
- **Responsive Design**: Mobile-first approach
- **Animations**: Framer Motion for smooth UX
- **Email Service**: Nodemailer for notifications
- **Security**: Input validation and error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Gmail App Password

### Clone Repository
```bash
git clone <repository-url>
cd Loan-App
```

### Backend Setup
```bash
cd server
npm install
```

Create `.env` file:
```env
PORT=8000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
NODE_ENV=development
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
CLIENT_URL=http://localhost:5173
```

Start server:
```bash
npm start
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 🌐 Deployment

### Backend (Render)
1. Connect GitHub repository
2. Set environment variables
3. Deploy with `npm start`

### Frontend (Vercel)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Update API base URL to deployed backend

## 📊 Loan Types & Rates

| Type | Interest Rate | Min Amount | Max Amount | Max Term |
|------|---------------|------------|------------|----------|
| Personal | 10.5% | ₹50,000 | ₹40,00,000 | 60 months |
| Education | 8.5% | ₹1,00,000 | ₹1,50,00,000 | 180 months |
| Home | 8.75% | ₹5,00,000 | ₹10,00,00,000 | 360 months |
| Business | 12% | ₹1,00,000 | ₹75,00,000 | 84 months |

## 🔐 Security Features

- **JWT Authentication** with secure tokens
- **Password Validation** with complexity requirements
- **Email Validation** with regex patterns
- **Role-based Authorization** for admin routes
- **Input Sanitization** and error handling
- **CORS Configuration** for secure API access

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Loans
- `GET /api/loans` - Get user loans
- `POST /api/loans/apply` - Apply for loan
- `GET /api/loans/options` - Get loan types

### Admin
- `GET /api/admin/loans` - Get all loans
- `PUT /api/admin/loans/:id` - Update loan status
- `GET /api/admin/users` - Get all users

### Payments
- `GET /api/payments/:loanId` - Get loan payments
- `POST /api/payments/:id/process` - Process payment

## 🎨 UI Components

- **Responsive Navbar** with role-based navigation
- **Animated Cards** with hover effects
- **Progress Indicators** for multi-step forms
- **Toast Notifications** for user feedback
- **Loading States** with smooth transitions
- **Mobile-friendly** hamburger menus

## 📧 Email Features

- **Password Reset** emails with secure tokens
- **Loan Status** notifications
- **Payment Reminders** for due EMIs
- **HTML Templates** with professional styling

## 🔄 Loan Workflow

1. **Application** - User fills multi-step form
2. **Submission** - Loan enters review status
3. **Admin Review** - Admin approves/rejects
4. **Approval** - EMI schedule generated
5. **Payments** - Monthly payment tracking
6. **Completion** - Loan closure process

## 🚦 Loan Eligibility

- **Multiple Loans**: Restricted until first EMI payment
- **Income Verification**: Required for approval
- **Credit Assessment**: Based on provided information
- **Employment Status**: Must be employed/self-employed

## 🎯 Future Enhancements

- **Document Upload** for loan verification
- **Credit Score Integration** with external APIs
- **SMS Notifications** for payment reminders
- **Advanced Analytics** dashboard
- **Mobile App** development
- **Payment Gateway** integration

## 👥 User Roles

### Regular User
- Apply for loans
- View loan status
- Make payments
- Update profile

### Admin
- Manage all loans
- Approve/reject applications
- View user analytics
- System administration

## ⚠️ Deployment Note

> The backend is hosted on **Render (free tier)** and may **take up to ~50 seconds to respond after periods of inactivity** due to cold starts.


## 📞 Support

For technical support or questions:
- Email: elurikalyan21@gmail.com
- Create an issue in the repository

## 📄 License

This project is licensed under the ISC License.

---

**Built using MERN Stack**

Note: Backend is hosted on Render free tier and may take up to ~50 seconds to respond after inactivity.
