import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  reg: Number,
  name: String,
  dob: Date,
});

export const studentModel = mongoose.model('Student',studentSchema)