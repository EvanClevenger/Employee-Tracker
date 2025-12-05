import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import PerformanceModule from "./models/Performance.js";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI as string, {})
  .then(() => console.log("Connected to DB"))
  .catch((err: unknown) => console.error("ERROR connecting to DB:", err));

const randomNum = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

interface MonthError {
  month: string;
  salesforceErrors: number;
  jiraErrors: number;
}

const generateMonthError = (): MonthError[] => {
  const months: MonthError[] = [];
  const currentDate = new Date();
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - i);
    const monthStr = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    months.push({
      month: monthStr,
      salesforceErrors: randomNum(0, 15),
      jiraErrors: randomNum(0, 10),
    });
  }
  return months;
};
// helper function to generate monthly errors

interface Employee {
  email: string;
  password: string;
  firstName: string;
  title: string;
  department: string;
  startDate: Date;
}

const employees = [
  {
    email: "eclevenger@switch.com",
    password: "password123",
    firstName: "evan",
    lastName: "clevenger",
    title: "Network Infrastructure Technician",
    department: "Engineering",
    startDate: new Date("2022-03-15"),
  },
  {
    email: "jsmith@switch.com",
    password: "password123",
    firstName: "john",
    lastName: "smith",
    title: "Software Engineer",
    department: "Engineering",
    startDate: new Date("2023-01-10"),
  },
  {
    email: "sjohnson@switch.com",
    password: "password123",
    firstName: "sarah",
    lastName: "johnson",
    title: "Lead Engineer",
    department: "Engineering",
    startDate: new Date("2021-06-01"),
  },
  {
    email: "mwilliams@switch.com",
    password: "password123",
    firstName: "michael",
    lastName: "williams",
    title: "Sales Manager",
    department: "Sales",
    startDate: new Date("2022-08-20"),
  },
  {
    email: "rbrown@switch.com",
    password: "password123",
    firstName: "rachel",
    lastName: "brown",
    title: "Account Executive",
    department: "Sales",
    startDate: new Date("2023-02-14"),
  },
  {
    email: "ddavis@switch.com",
    password: "password123",
    firstName: "david",
    lastName: "davis",
    title: "Sales Representative",
    department: "Sales",
    startDate: new Date("2023-05-01"),
  },
  {
    email: "amiller@switch.com",
    password: "password123",
    firstName: "amanda",
    lastName: "miller",
    title: "Operations Manager",
    department: "NetOps",
    startDate: new Date("2021-11-10"),
  },
  {
    email: "jwilson@switch.com",
    password: "password123",
    firstName: "james",
    lastName: "wilson",
    title: "Engineer",
    department: "DCO Systems",
    startDate: new Date("2022-09-05"),
  },
  {
    email: "lmoore@switch.com",
    password: "password123",
    firstName: "linda",
    lastName: "moore",
    title: "Engineer",
    department: "Junior Engineer",
    startDate: new Date("2024-01-08"),
  },
  {
    email: "ktaylor@switch.com",
    password: "password123",
    firstName: "kevin",
    lastName: "taylor",
    title: "Analyst",
    department: "Business Analyst",
    startDate: new Date("2023-07-22"),
  },
];
// Dummy employee data

const seedDatabase = async (): Promise<void> => {
  try {
    console.log("clearing existing Data");
    //clear existing data
    await User.deleteMany({});
    await PerformanceModule.deleteMany({});
    console.log("creating users");
    for (const emp of employees) {
      const lastName = (emp.email.split("@")[0] ?? "").slice(1) || "unknown"; //extracting last name
      const hashedPassword = await bcrypt.hash(emp.password, 10); // hash password
      const user = new User({
        ...emp,
        password: hashedPassword, // do I need a first name here?
        lastName,
        profilePic: "😎",
      });
      await user.save();
      console.log(`Created ${emp.firstName}, ${lastName}`);
      //create performace data
      const performance = new PerformanceModule({
        employeeLastName: lastName,
        salesforce: {
          totalCasesToDate: randomNum(50, 500),
          totalCasesThisYear: randomNum(20, 150),
          crossConnects: randomNum(10, 100),
          disconnects: randomNum(10, 100),
          errorsPerCase: parseFloat((Math.random() * 2).toFixed(2)),
        },
        jira: {
          timeSpentHours: randomNum(100, 800),
          casesAssignedThisYear: randomNum(15, 100),
        },
        serviceNow: {
          billableHours: randomNum(100, 800),
          nonBillableHours: randomNum(100, 800),
        },
        UKG: {
          directLaborHours: randomNum(100, 800),
          capexLaborHours: randomNum(100, 800),
          defferedLaborHours: randomNum(100, 800),
        },
        monthlyErrors: generateMonthError(),
      });
      await performance.save();
      console.log(`Created Performace data for: ${lastName}`);
      console.log("\n✅ Database seeded successfully!");
      console.log("\n📝 Login credentials for testing:");
    }
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedDatabase();
