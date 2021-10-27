import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { adminModel } from "../model/admin.model";
import { userModel } from "../model/user.model";

const secret_key: string = "ThisIsScretKeyOfJWTToken";
const exp: number = 3 * 24 * 60 * 60;

export const createJWTToken = async (id: string) => {
  const jwt_token = await jwt.sign({ id }, secret_key, {
    expiresIn: exp,
  });

  return jwt_token;
};

export const varifyAdminJWTToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.header("chat_app_token");
  if (!token) {
    return res.send("Unautharised Access");
  } else {
    let data: any = jwt.verify(token, secret_key);
    console.log("data", data);
    const info = await adminModel.findById({ _id: data.id });
    if (info) {
      // res.locals.user = user;
      next();
    } else {
      return res.status(400).json({
        message: "Admin not found",
      });
    }
  }
};

export const varifyUserJWTToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.header("chat_app_token");
  if (!token) {
    return res.send("Unautharised Access");
  } else {
    let data: any = jwt.verify(token, secret_key);
    console.log("user", data);
    const info = await userModel.findById({ _id: data.id });
    if (info) {
      next();
    } else {
      return res.status(400).json({
        message: "User not found",
      });
    }
  }
};
