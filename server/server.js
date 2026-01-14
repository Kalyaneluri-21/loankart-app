const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const loanRoutes = require("./routes/loanRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://loankart-app.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS not allowed"));
  },
  credentials: true,
}));


app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.path} - User: ${
      req.headers.authorization ? "Authenticated" : "Anonymous"
    }`
  );
  next();
});

// Test route
app.get("/api/test", (req, res) => {
  try {
    res.json({ message: "Server is working!" });
  } catch (error) {
    res.status(500).json({ error: "Test route error" });
  }
});

// Simple test login
app.post("/api/auth/test-login", (req, res) => {
  try {
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      { userId: "test123", email: "test@example.com" },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "24h" }
    );
    res.json({ token, message: "Test login successful" });
  } catch (error) {
    res.status(500).json({ error: "Test login error" });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

// Database connection
try {
  mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/loanapp", {
    serverSelectionTimeoutMS: 30000, // wait up to 30s for Atlas (important for Render)
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
} catch (error) {
  console.error("Database setup error:", error);
  process.exit(1);
}

try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Server startup error:", error);
  process.exit(1);
}
