import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: "/home/ayushkathayat/WEBDEV/todo-v2/.env",
  });
}
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/databaseConnection.js"; //dont forget to add the .js extension'
import passport from "passport";
import session from "express-session";
import taskRouter from "./routes/tasksRoutes.js";
import userRouter from "./routes/userRoutes.js";
import initializePassport from "./configs/passport.js";
import MongoStore from "connect-mongo";
import path from "path";

const __dirname = path.resolve();

const PORT = process.env.PORT || 5050;
const app = express();
connectDB(); // calling the function to connect to the database

// console.log();
// middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Enable All CORS Requests
// app.use(
//   cors({
//     origin: true, // replace with the domain of your front-end app Change it for the deployment
//     credentials: true,
//     methods: "GET,PUT,POST,DELETE",
//   })
// );

app.use(cookieParser());
// passport middleware

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

initializePassport(); // calling the function to initialize passport

app.use("/api/v2", taskRouter); // using the task routes

app.use("/api/v2", userRouter); // using the user routes

// Serve static assets if in production

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
