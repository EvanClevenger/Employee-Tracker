"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcryptjs_1 = require("bcryptjs");
var User_1 = require("./models/User");
var Performace_1 = require("./models/Performace");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.MONGODB_URI, {})
    .then(function () { return console.log("Connected to DB"); })
    .catch(function (err) { return console.error("ERROR connecting to DB:", err); });
var randomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
var generateMonthError = function () {
    var months = [];
    var currentDate = new Date();
    for (var i = 5; i >= 0; i--) {
        var date = new Date(currentDate);
        date.setMonth(date.getMonth() - i);
        var monthStr = "".concat(date.getFullYear(), "-").concat(String(date.getMonth() + 1).padStart(2, "0"));
        months.push({
            month: monthStr,
            salesforceErrors: randomNum(0, 15),
            jiraErrors: randomNum(0, 10),
        });
        return months;
    }
};
var employees = [
    {
        email: "eclevenger@switch.com",
        password: "password123",
        firstName: "Emily",
        title: "Network Infrastructure Technician",
        department: "Engineering",
        startDate: new Date("2022-03-15"),
    },
    {
        email: "jsmith@switch.com",
        password: "password123",
        firstName: "John",
        title: "Software Engineer",
        department: "Engineering",
        startDate: new Date("2023-01-10"),
    },
    {
        email: "sjohnson@switch.com",
        password: "password123",
        firstName: "Sarah",
        title: "Lead Engineer",
        department: "Engineering",
        startDate: new Date("2021-06-01"),
    },
    {
        email: "mwilliams@switch.com",
        password: "password123",
        firstName: "Michael",
        title: "Sales Manager",
        department: "Sales",
        startDate: new Date("2022-08-20"),
    },
    {
        email: "rbrown@switch.com",
        password: "password123",
        firstName: "Rachel",
        title: "Account Executive",
        department: "Sales",
        startDate: new Date("2023-02-14"),
    },
    {
        email: "ddavis@switch.com",
        password: "password123",
        firstName: "David",
        title: "Sales Representative",
        department: "Sales",
        startDate: new Date("2023-05-01"),
    },
    {
        email: "amiller@switch.com",
        password: "password123",
        firstName: "Amanda",
        title: "Operations Manager",
        department: "Operations",
        startDate: new Date("2021-11-10"),
    },
    {
        email: "jwilson@switch.com",
        password: "password123",
        firstName: "James",
        title: "Operations Coordinator",
        department: "Operations",
        startDate: new Date("2022-09-05"),
    },
    {
        email: "lmoore@switch.com",
        password: "password123",
        firstName: "Linda",
        title: "Junior Engineer",
        department: "Engineering",
        startDate: new Date("2024-01-08"),
    },
    {
        email: "ktaylor@switch.com",
        password: "password123",
        firstName: "Kevin",
        title: "Business Analyst",
        department: "Operations",
        startDate: new Date("2023-07-22"),
    },
];
// Dummy employee data
var seedDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, employees_1, emp, lastName, hashedPassword, user, performance_1, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                console.log("clearing existing Data");
                //clear existing data
                return [4 /*yield*/, User_1.default.deleteMany({})];
            case 1:
                //clear existing data
                _b.sent();
                return [4 /*yield*/, Performace_1.default.deleteMany({})];
            case 2:
                _b.sent();
                console.log("creating users");
                _i = 0, employees_1 = employees;
                _b.label = 3;
            case 3:
                if (!(_i < employees_1.length)) return [3 /*break*/, 8];
                emp = employees_1[_i];
                lastName = ((_a = emp.email.split("@")[0]) !== null && _a !== void 0 ? _a : "").slice(1) || "unknown";
                return [4 /*yield*/, bcryptjs_1.default.hash(emp.password, 10)];
            case 4:
                hashedPassword = _b.sent();
                user = new User_1.default(__assign(__assign({}, emp), { password: hashedPassword, lastName: lastName, profilePic: "😎" }));
                return [4 /*yield*/, user.save()];
            case 5:
                _b.sent();
                console.log("Created ".concat(emp.firstName, ", ").concat(lastName));
                performance_1 = new Performace_1.default({
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
                return [4 /*yield*/, performance_1.save()];
            case 6:
                _b.sent();
                console.log("Created Performace data for: ".concat(lastName));
                console.log("\n✅ Database seeded successfully!");
                console.log("\n📝 Login credentials for testing:");
                console.log("   Email: eclevenger@work.com");
                console.log("   Password: password123");
                console.log("\n   (All employees use password123)\n");
                _b.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 3];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_1 = _b.sent();
                console.error("Seeding Error:", error_1);
                process.exit(1);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
seedDatabase();
