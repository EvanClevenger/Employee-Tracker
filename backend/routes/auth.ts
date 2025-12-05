import express, { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";

const router: Router = express.Router();

const extractLastName = (email: string): string => {
  const username = email.split("@")[0] ?? ""; // gets everything before @
  return username.slice(1); // removes the first letter of email
};

// POST /api/auth/register
router.post("/register", async (req: Request, res: Response) => {
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
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const getLastName = extractLastName(email);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName: getLastName,
      title,
      department,
      startDate,
      profilePicture: "😊",
    });

    await user.save();

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

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
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

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
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

// GET /api/auth/me
router.get("/me", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.userId).select(
      "-password"
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
