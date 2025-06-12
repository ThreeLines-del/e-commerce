import { Request, Response } from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Create user/signup
export const userSignUp = async (req: Request, res: Response) => {
  let check = await User.findOne({ email: req.body.email });

  if (check) {
    res.status(400).json({ success: false, errors: "existing email" });
  }

  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.status(200).json({ success: true, token });
};

// User login
export const userLogIn = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      const passwrodCompare = req.body.password === user.password;

      if (passwrodCompare) {
        const data = {
          user: {
            id: user.id,
          },
        };

        const token = jwt.sign(data, "secret_ecom");

        res.json({
          success: true,
          token,
        });
      } else {
        res.json({
          success: false,
          errors: "Wrong Password",
        });
      }
    } else {
      res.json({
        success: false,
        errors: "Wrong Email Id or Password",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};
