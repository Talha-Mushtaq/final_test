import express from "express";
import { AdminController } from "../controller/admin.controller";
import { IAdminReqLogin } from "../type/request/admin.request";
import { IAdminRes } from "../type/response/admin.response";

export class AdminRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.post("/loginAdmin", async (req, res, next) => {
      try {
        const data: IAdminReqLogin = req.body;
        const admin_login: IAdminRes = await new AdminController().loginAdmin(
          data
        );

        res.status(200).json({
          data: admin_login,
        });
      } catch (error) {
        next(error);
      }
    });
  }
}

export const AdminRoute = new AdminRoutes().router;
