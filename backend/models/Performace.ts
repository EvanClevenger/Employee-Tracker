// const mongoose = require("mongoose");

const MonthlyErrorSchema = new mongoose.Schema({
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

const PerformanceSchema = new mongoose.Schema({
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
module.exports = mongoose.model("Performance", PerformanceSchema);
