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
const app = express();

//cross - origin configuration
app.use(
  cors({
    origin: "https://review-website-bice.vercel.app",
    credentials: true,
  })
);
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
  })
);
app.use(errorHandler);

//For Google oAuth. Take whole user object from auth and store it into session
app.use(passport.initialize());
app.use(passport.session())

//Routes
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
