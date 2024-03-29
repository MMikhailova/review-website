import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

const authControllers = {
  getUser: async (req, res) => {
    const id = req.cookies.id;
      const existingUser = await User.findOne({ _id: id });
      if (!existingUser) {
        return res.status(400).json({ message: "User don't exist!" });
      } else {
        console.log(existingUser);
      return res.status(200).json({ existingUser });}
    
   
  },
  signIn: async (req, res) => {
    //normal form
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res.status(400).json({ message: "Invalid field" });
    }

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User don't exist!" });
    }
    const isPasswordValid = bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid info!" });
    }
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      "hdskdh",
      { expiresIn: "4h" }
    );

    const userData = {
      id: existingUser._id,
      token: token,
      isGoogleAuth: false,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
    };
    // Set cookies
    res.cookie("id", userData.id, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
    res.cookie("token", userData.token, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, //cross-site cookie
    });

    res.cookie("isGoogleAuth", userData.isGoogleAuth, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, //cross-site cookie
    });
    return res.status(200).json({ userData });
  },
  signUp: async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
console.log(email, password, confirmPassword, firstName, lastName);
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
        password !== confirmPassword || password.length <=4
    ) {
      return res.status(400).json({ message: "Invalid field!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      "hdskdh",
      { expiresIn: "1h" }
    );
    const newUser = {
      id: result._id,
      token: token,
      isGoogleAuth: false,
      firstName: result.firstName,
      lastName: result.lastName
    };
    // Set cookies
    res.cookie("id", newUser.id, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, //cross-site cookie
    });
    res.cookie("token", newUser.token, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, //cross-site cookie
    });
    res.cookie("isGoogleAuth", newUser.isGoogleAuth);
    return res.status(201).json({ newUser });
  },
  logout: (req, res) => {
     res.clearCookie('token',{ httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie("id", { httpOnly: true, sameSite: "None", secure: true });
    res.clearCookie("isGoogleAuth", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
        return res
            .status(200)
            .json({  message: 'User logged out successfully' });
    },
};
export default authControllers;
