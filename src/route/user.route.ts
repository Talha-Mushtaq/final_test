import express from "express";
import { UserController } from "../controller/user.controller";
import {
  varifyAdminJWTToken,
  varifyUserJWTToken,
} from "../middleware/jwt.middleware";
import {
  IUserReqLogin,
  IUserReqSave,
  IUserReqUpdate,
} from "../type/request/user.request";
import { IUserRes } from "../type/response/user.response";
export class UserRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.post(
      "/registerUser",
      varifyAdminJWTToken,
      async (req, res, next) => {
        try {
          const data: IUserReqSave = req.body;
          const register: IUserRes =
            await new UserController().registerDataUser(data);
          res.status(200).json({
            data: register,
          });
        } catch (error) {
          next(error);
        }
      }
    );

    this.router.post("/loginUser", async (req, res, next) => {
      try {
        const data: IUserReqLogin = req.body;
        const login: IUserRes = await new UserController().loginDataUser(data);
        res.status(200).json({
          data: login,
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.post(
      "/updateUser",
      varifyUserJWTToken,
      async (req, res, next) => {
        try {
          const data: IUserReqUpdate = req.body;
          const update: IUserRes = await new UserController().updateDataUser(
            data
          );
          res.status(200).json({
            data: update,
          });
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export const UserRoute = new UserRoutes().router;
