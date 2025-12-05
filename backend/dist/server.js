import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
dotenv.config();
const app = express();
// Allows frontend to make requests with backend
app.use(cors());
// Parses incoming JSON data
app.use(express.json());
// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
// Test GET endpoint
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is running!",
        timestamp: new Date(),
    });
});
// Import routes
app.use("/api/auth", authRoute);
// app.use("/api/employees", employeeRoute);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});
//# sourceMappingURL=server.js.map