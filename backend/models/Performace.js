"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MonthlyErrorSchema = new mongoose_1.default.Schema({
    month: {
        type: String,
        required: true,
    },
    salesforceErrors: {
        type: Number,
        default: 0,
    },
    jiraErrors: {
        type: Number,
        default: 0,
    },
});
var PerformanceSchema = new mongoose_1.default.Schema({
    employeeLastName: {
        type: String,
        required: true,
        index: true, //makes searches faster
    },
    salesforce: {
        totalCasesToDate: { type: Number, default: 0 },
        totalCasesThisYear: { type: Number, default: 0 },
        crossConnects: { type: Number, default: 0 },
        disconnects: { type: Number, default: 0 },
        errorsPerCase: { type: Number, default: 0 },
    },
    jira: {
        timeSpentHours: { type: Number, default: 0 },
        casesAssignedThisYear: { type: Number, default: 0 },
    },
    serviceNow: {
        billableHours: { type: Number, default: 0 },
        nonBillableHours: { type: Number, default: 0 },
    },
    UKG: {
        directLaborHours: { type: Number, default: 0 },
        capexLaborHours: { type: Number, default: 0 },
        defferedLaborHours: { type: Number, default: 0 },
    },
    monthlyErrors: [MonthlyErrorSchema],
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Performance", PerformanceSchema);
