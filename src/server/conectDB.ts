"use server";
import { connect } from "mongoose";

const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env
  .MONGO_PASSWORD}@next-chat.nzff6ie.mongodb.net/?retryWrites=true&w=majority`;

export async function connectDB() {
  try {
    await connect(connectionString);
    console.log("connected db succeffully");
  } catch (error) {
    console.log("unable to connect database");
  }
}
