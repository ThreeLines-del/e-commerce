import express from "express";
import { userLogIn, userSignUp } from "../controllers/signuplogincontroller.js";

export const signUpLogInRouter = express.Router();

// Create user/signup
signUpLogInRouter.post("/signup", userSignUp);

// User login
signUpLogInRouter.post("/login", userLogIn);
