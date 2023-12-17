import dotenv from "dotenv";
import mongoose from "mongoose";
import { studentModel } from "./schema.js";
dotenv.config();

const url = process.env.DB_URI;

async function main() {
  try {
    // connect to our database
    await mongoose.connect(url);
    console.log("Successfully connected");
    // create our new student
    //CREATE
    //     const myNewStudent = new studentModel({
    //       name: "anas",
    //       reg: 1234567,
    //     });

    //     // save it in database
    //   const doc =await  myNewStudent.save()
    // READ
    // const data = await studentModel.findOne({name:"anas"})
    // console.log(data);

    //UPDATE
    // await studentModel.updateOne({ name: "vidyavasini" }, { $set: { reg: 2020 } });

    // const currentStudent = await studentModel.findOne({ reg: 20255 });
    // currentStudent.name = "asldkfjas;ldkjf";
    // await currentStudent.save();
    // Delete
    // const result = await studentModel.deleteOne({ name: "anas" });
    // console.log(result);
  } catch (error) {
    console.log(error);
  }
}

main();
