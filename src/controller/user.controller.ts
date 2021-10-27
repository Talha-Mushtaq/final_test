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
  Security,
} from "tsoa";
import { IUserRes } from "../type/response/user.response";
import {
  IUserReqLogin,
  IUserReqSave,
  IUserReqUpdate,
} from "../type/request/user.request";
import { UserRespository } from "../repository/user.repository";
import { hashingPassword, matchingPassword } from "../custom/hashing.custom";
import { createJWTToken } from "../middleware/jwt.middleware";

@Route("user")
@Tags("User Routes")
export class UserController {
  constructor() {}

  /**
   * User will register by required data first then goto user protected route
   * @summary User will register first to do a certains action into routes
   * @param data User name,email, password and pictureUrl
   * @returns
   */
  @Security("api_key")
  @Post("registerUser")
  async registerDataUser(@Body() data: IUserReqSave): Promise<IUserRes> {
    data.password = await hashingPassword(data.password);
    const save: IUserRes = await new UserRespository().registerDataUser(
      <IUserReqSave>data
    );
    return <IUserRes>save;
  }
  /**
   * User will login by required data first then goto cetain of protected routes
   * @summary User will login to do actions
   * @param data User email and password
   * @returns
   */
  @Post("loginUser")
  async loginDataUser(@Body() data: IUserReqLogin): Promise<IUserRes> {
    const search: IUserRes = <any>(
      await new UserRespository().searchDataUser(<string>data.email)
    );
    let obj: any = {};

    if (search) {
      obj._id = search._id;
      obj.name = search.name;
      obj.email = search.email;
      obj.password = search.password;
      obj.pictureUrl = search.pictureUrl;

      let chk = await matchingPassword(data.password, search.password);
      if (chk) {
        obj.token = await createJWTToken(search._id);
      } else {
        obj.message = "Enter correct pasword";
      }
    } else {
      obj.message = "Enter correct email";
    }

    return <IUserRes>obj;
  }

  /**
   * User have to login first then update profile
   * @summary User can update record by its id
   * @param data User id,name,email,pictureUrl
   * @returns
   */
  @Security("api_key")
  @Post("updateUser")
  async updateDataUser(@Body() data: IUserReqUpdate): Promise<IUserRes> {
    let obj: any = {};

    const search: IUserRes = <any>(
      await new UserRespository().findUserPassword(<string>data._id)
    );
    if (search) {
      let chk = await matchingPassword(data.password, search.password);
      console.log(chk);
      if (chk) {
        data.password = search.password;
      } else {
        data.password = await hashingPassword(data.password);
      }
      console.log(data);
      const resp: IUserRes = <any>(
        await new UserRespository().updateDataUser(<IUserReqUpdate>data)
      );
      if (resp) {
        obj._id = resp._id;
        obj.name = resp.name;
        obj.email = resp.email;
        obj.password = resp.password;
        obj.pictureUrl = resp.pictureUrl;
        obj.message = "User Updated";
      } else {
        obj.message = "User Not Updated";
      }
    } else {
      obj.message = "Please register your account";
    }

    return <IUserRes>obj;
  }
}
