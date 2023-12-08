//Library imports
import express from "express";
import cors from "cors";
import path from "path"


//Custom Imports
import { connectToDb } from "./lib/db.js";
import { todoModel } from "./lib/schemas/todo.js";

//Dotenv
import dotenv from "dotenv";
dotenv.config();

//Server
const app = express();

//Middlewares
app.use(cors());
app.use(express.json())
app.use(express.static(path.resolve("public")))

connectToDb(process.env.DB_URI);

app.get("/api", async (req, res) => {
  try {
    const allTodos = await todoModel.find();
    res.json(allTodos);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/api", async (req, res) => {
  try {
    const {todo} = req.body
    console.log(todo);
    if (!todo) {
        res.status(400).send("Invalid Body , You need to pass todo.")
        return
    }
    const newTodo = new todoModel({
        todoItem:todo
    })
    await newTodo.save()
    res.sendStatus(201)
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
});

app.delete("/api/:id", async (req, res) => {
  try {
    const deletedItem = await todoModel.deleteOne({
      _id: req.params.id,
    });
    // 0->false 1->true
    if (deletedItem.deletedCount) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("*",(req,res)=>{
    res.sendFile(path.resolve("public","index.html"))
})

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
