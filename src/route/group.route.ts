import express from "express";
import { GroupController } from "../controller/group.controller";
import { varifyAdminJWTToken } from "../middleware/jwt.middleware";
import {
  IGroupReqAddUserToGroup,
  IGroupReqcheckMessagesFromGroup,
  IGroupReqSave,
  IGroupReqsendMessageToGroup,
  IGroupReqSpecificeWordSearch,
  IGroupReqSpecificUserWordSearch,
} from "../type/request/group.request";
import { IGroupRes } from "../type/response/group.response";

export class GroupRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.post(
      "/createGroup",
      varifyAdminJWTToken,
      async (req, res, next) => {
        try {
          const data: IGroupReqSave = req.body;
          const r: IGroupRes = await new GroupController().createGroup(data);

          res.status(200).json({
            data: r,
          });
        } catch (error) {
          next(error);
        }
      }
    );

    this.router.post(
      "/addUserToGroup",
      varifyAdminJWTToken,
      async (req, res, next) => {
        try {
          const data: IGroupReqAddUserToGroup = req.body;
          const r: IGroupRes = await new GroupController().addUserToGroup(data);

          res.status(200).json({
            data: r,
          });
        } catch (error) {
          next(error);
        }
      }
    );
    this.router.post("/sendMessageToGroup", async (req, res, next) => {
      try {
        const data: IGroupReqsendMessageToGroup = req.body;
        const r: IGroupRes = await new GroupController().sendMessageToGroup(
          data
        );

        res.status(200).json({
          data: r,
        });
      } catch (error) {
        next(error);
      }
    });
    this.router.post(
      "/checkMessagesFromGroup",
      varifyAdminJWTToken,
      async (req, res, next) => {
        try {
          const data: IGroupReqcheckMessagesFromGroup = req.body;
          const r: IGroupRes =
            await new GroupController().checkMessagesFromGroup(data);

          res.status(200).json({
            data: r,
          });
        } catch (error) {
          next(error);
        }
      }
    );
    this.router.post(
      "/specificeWordSearch",
      varifyAdminJWTToken,
      async (req, res, next) => {
        try {
          const data: IGroupReqSpecificeWordSearch = req.body;
          const r: IGroupRes = await new GroupController().specificeWordSearch(
            data
          );

          res.status(200).json({
            data: r,
          });
        } catch (error) {
          next(error);
        }
      }
    );
    this.router.post(
      "/specificUserWordSearch",
      varifyAdminJWTToken,
      async (req, res, next) => {
        try {
          const data: IGroupReqSpecificUserWordSearch = req.body;
          const r: IGroupRes =
            await new GroupController().specificUserWordSearch(data);

          res.status(200).json({
            data: r,
          });
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export const GroupRoute = new GroupRoutes().router;
