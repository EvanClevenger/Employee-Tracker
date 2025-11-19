const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

//allows frontend to make requests with backend
app.use(cors());

//parses incoming JSON data
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

//Test GET endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Sever is running!",
    timestamp: new Date(),
  });
});

//Import routes
// app.use("/api/auth", require("/routes/auth"));
// app.use("/api/employees", require("/routes/employees"));

//Error handeling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});
//clicking on the link will show server health ⬆️
