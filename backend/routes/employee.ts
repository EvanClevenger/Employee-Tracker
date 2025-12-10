import express, { Request, Response, NextFunction } from "express";
import authMiddleware from "../middleware/auth";
import User from "../models/User";
import Performance from "../models/Performance";

const router = express.Router();

// Extend Express Request type to include `user` from JWT
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    lastName: string;
    // add other JWT payload fields if needed
  };
}

// ALL routes here require authentication
router.use(authMiddleware);

// ROUTE: Get all employees in user's department
// GET /api/employees
router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const currentUser = await User.findById(req.user?.userId);
    if (!currentUser) {
      return res.status(404).json({ error: "Current user not found" });
    }

    const employees = await User.find({
      department: currentUser.department,
    }).select("-password");

    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ROUTE: Get current user's performance data
// GET /api/employees/my-stats
router.get("/my-stats", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const lastName = req.user?.lastName;
    if (!lastName) {
      return res.status(400).json({ error: "Missing lastName in token" });
    }

    let performance = await Performance.findOne({
      employeeLastName: lastName,
    });

    if (!performance) {
      performance = new Performance({ employeeLastName: lastName });
      await performance.save();
    }

    res.json(performance);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ROUTE: Get specific employee by last name (only if in same department)
// GET /api/employees/:lastName
router.get("/:lastName", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { lastName } = req.params;
    const currentUser = await User.findById(req.user?.userId);

    if (!currentUser) {
      return res.status(404).json({ error: "Current user not found" });
    }

    const employee = await User.findOne({ lastName }).select("-password");
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    if (employee.department !== currentUser.department) {
      return res.status(403).json({
        error: "You can only view employees in your department",
      });
    }

    const performance = await Performance.findOne({
      employeeLastName: lastName,
    });

    res.json({ employee, performance });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
