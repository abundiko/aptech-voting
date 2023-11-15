import { Schema, connection } from "mongoose";

const studentSchema = new Schema({
  sid: {
    type: String,
    required: true
  },
  voted: {
    type: Boolean,
    default: false
  }
});

const StudentModel = connection
  .useDb("aptech-voting")
  .model("Student", studentSchema, "students");

export default StudentModel;
