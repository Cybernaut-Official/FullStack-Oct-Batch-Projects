import express from "express"
import cors from "cors"

const app = express()

app.use(cors())

app.get("/",(req,res)=>{
    res.json("get req received updated.")
})
app.get("/thing",(req,res)=>{
    res.json("thing")
})

app.post("/",(req,res)=>{
    res.json("post req received.")
})

app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
})