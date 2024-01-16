import 'express-async-errors'
import cookieParser from "cookie-parser";
import express from 'express'
import dotenv from "dotenv"
import mongoose from 'mongoose'
import cors from 'cors'
import session from "express-session";
import passport from 'passport'
import './passport.js'
import authRoutes from '../route/auth.js'
import errorHandler from '../middleware/errorHandler.js';
import bookRoutes from "../route/book.js";
import userRoutes from "../route/user.js";
//dotenv to load environment variable
dotenv.config();

const PORT = process.env.PORT || 5002;
//app is an object with methods
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//Middleware
// handle JSON payloads in the request body.
app.use(express.json())

/**
 * cross-origin configuration
 */
const prodOrigins = process.env.ORIGIN
const devOrigin = ["http://localhost:5173"];
const allowedOrigins=process.env.NODE_ENV==="production"?prodOrigins:devOrigin
app.use(cors({
  origin: (origin, callback) => {
    if (!origin||allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }, credentials: true,
  methods:['GET','POST','PUT','DELETE']
}))


app.use(errorHandler);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized:true
    })
)
app.use(passport.initialize());
app.use(passport.session())
//taking whole user object from auth and store it into session

app.use(authRoutes);
app.use(bookRoutes);
app.use(userRoutes);

//connect to mongodb via mongoose.connect
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URI);
    console.log("Connected to the database successfully");
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};
connectToDB();
