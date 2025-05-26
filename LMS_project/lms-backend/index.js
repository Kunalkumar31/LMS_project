
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Initialize app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());


// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const recommendRoutes = require("./routes/recommendRoutes");
const protectedRoutes = require("./routes/protected.routes");

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/recommend", recommendRoutes);

// Use the protected routes
app.use("/api", protectedRoutes);

// Start server
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

// Run the server
startServer();
