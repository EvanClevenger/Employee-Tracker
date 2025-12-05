import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@switch\.com$/, "Please enter a valid Switch email"], // Must use RegEx when using TS & Mongoose
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
    enum: [
      "Engineering",
      "Security",
      "DCO Systems",
      "NetOps",
      "Sales",
      "Business Analyst",
      "Junior Engineer",
    ], //only these are allowed
  },
  startDate: {
    type: Date,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "🥸", // will need to come back to this
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);
// "User" is the name of the model
// UserSchema is the schema object that defines the DB structure
