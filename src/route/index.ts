import express from "express";
import { AdminRoute } from "./admin.route";
import { GroupRoute } from "./group.route";
import { UserRoute } from "./user.route";
export class MainRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.use("/admin", AdminRoute);
    this.router.use("/user", UserRoute);
    this.router.use("/group", GroupRoute);
  }
}
export const MainApi = new MainRouter().router;
