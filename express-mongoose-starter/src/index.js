import dotenv from "dotenv";
import mongoose from "mongoose";
import { studentModel } from "./schema.js";
import express from "express";
dotenv.config();

const url = process.env.DB_URI;

const app = express();

app.use(express.json());

async function connectToDb() {
  try {
    await mongoose.connect(url);
    console.log("Successfully connected");
  } catch (error) {
    console.log(error);
  }
}
connectToDb();

app.get("/", async (req, res) => {
  const students = await studentModel.find();
  res.json(students);
});

app.post("/", async (req, res) => {
  const name = req.body.name;
  const reg = req.body.reg;
  if (name && reg) {
    const students = new studentModel({
      name,
      reg,
    });
    await students.save();
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
// C R U D -> POST , GET , PUT , DELETE
