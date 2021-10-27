import {
  Get,
  Route,
  Tags,
  Post,
  Body,
  Path,
  Put,
  Delete,
  SuccessResponse,
} from "tsoa";
import { hashingPassword, matchingPassword } from "../custom/hashing.custom";
import { IAdminReqLogin } from "../type/request/admin.request";
import { IAdminRes } from "../type/response/admin.response";
import { createJWTToken } from "../middleware/jwt.middleware";
import { AdminRespository } from "../repository/admin.repository";

@Route("admin")
@Tags("Admin Routes")
export class AdminController {
  constructor() {}

  /**
   * Admin will login by required data first then go to protected route
   * @summary Admin will login to perform actions on protected routes
   * @param data Admin email and password
   * @returns
   */

  @Post("loginAdmin")
  async loginAdmin(@Body() data: IAdminReqLogin): Promise<IAdminRes> {
    let resp: IAdminRes = <any>(
      await new AdminRespository().loginAdmin(<string>data.email)
    );
    let retObj: any = {};

    if (resp) {
      let chk = await matchingPassword(data.password, resp.password);
      retObj._id = resp._id;
      retObj.name = resp.name;
      retObj.email = resp.email;
      retObj.password = resp.password;
      if (chk) {
        retObj.token = await createJWTToken(resp._id);
      } else {
        retObj.message = "Password not correect";
      }
    } else {
      retObj.message = "Email not correect";
    }
    return <IAdminRes>retObj;
  }
}
