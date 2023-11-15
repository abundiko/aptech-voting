import { Schema, connection } from "mongoose";

const facultySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  dressing: {
    type: Number,
    default: 0
  },
  punctuality: {
    type: Number,
    default: 0
  },
  education: {
    type: Number,
    default: 0
  }
});

const FacultyModel = connection
  .useDb("aptech-voting")
  .model("Faculty", facultySchema, "faculties");

export default FacultyModel;
