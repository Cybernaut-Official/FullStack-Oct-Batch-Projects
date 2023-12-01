import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { userModel } from "./schema/user.js";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => {
    console.log(e);
    console.log("Error connection to db");
  });

const app = express();
//Express Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

//Session based auth
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      collectionName: "sessions",
      stringify: true,
    }),
  })
);

app.use(passport.session());

//Passport Middleware
passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

//Routes
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const newUser = new userModel({ username });
  userModel.register(newUser, password, (err, acc) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.sendStatus(200);
      });
    }
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Username or password missing");
  }
  const currentUser = new userModel({
    username: username,
    password: password,
  });
  req.login(currentUser, (err) => {
    if (err) {
      res.sendStatus(400);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.sendStatus(200);
      });
    }
  });
});

app.post("/signout", async (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

app.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.get("/htm", (req, res) => {
  res.sendFile("/home/anasmohammed361/vs/Batch2/passport-main/views/main.html");
});

app.get("/", (req, res) => {
  res.send("root route");
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
