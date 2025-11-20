const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const extractLastName = (email) => {
  const username = email.split("@")[0]; // gets everything before @
  return username.slice(1); // removes the first letter of email
};

POST /
  api /
  auth /
  registerrouter.post("/register", async (req, res) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        title,
        department,
        startDate,
      } = req.body;
      if (
        !email ||
        !password ||
        !firstName ||
        !lastName ||
        !title ||
        !department ||
        !startDate
      ) {
        return res.status(400).json({ error: "All feilds are required" });
      } // validates that all feilds are filled out;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "email already is use" });
      } // checks for existing user email;

      const getLastName = extractLastName(email);

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = User({
        email,
        password: hashedPassword,
        firstName,
        lastName: getLastName,
        title,
        department,
        startDate,
        profilePicture: "😊",
      }); //creates new user

      await user.save(); // save to DB

      const token = jwt.sign({
        userId: user._id,
        email: user.email,
        lastName: user.lastName,
      }); //creating web token
      process.env.JWT_SECRET, { expiresIn: "7d" }; //giving 7day expiration date

      res.status(200).json({
        message: "User successfully created",
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          department: user.department,
        },
      });
    } catch (error) {
      console.error("Registration error :", error);
      res.status(500).json({ error: "server error during registration" });
    }
  });

POST /
  api /
  auth /
  loginrouter.post("login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      const user = await User.findOne({ email: email.toLowerCase() }); //find user by email
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password); //compares entered password with stored hash
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({
        userId: user._id,
        email: user.email,
        lastName: user.lastName,
      }); // creates JWT

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          department: user.department,
          title: user.title,
          profilePicture: "🤔",
        },
      });
    } catch (error) {
      console.error("login error:", error);
      res.status(500).json({ error: "server error during login" });
    }
  });

GET /
  api /
  auth /
  merouter.get("/me", require("../middleware/auth"), async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select("-password");
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;
