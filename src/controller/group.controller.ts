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
import { hashingPassword, matchingPassword } from "../custom/hashing.custom";
import { GroupRespository } from "../repository/group.repository";
import { createJWTToken } from "../middleware/jwt.middleware";
import { IGroupRes } from "../type/response/group.response";
import {
  IGroupReqAddUserToGroup,
  IGroupReqcheckMessagesFromGroup,
  IGroupReqSave,
  IGroupReqsendMessageToGroup,
  IGroupReqSpecificeWordSearch,
  IGroupReqSpecificUserWordSearch,
} from "../type/request/group.request";

@Route("group")
@Tags("Group Routes")
export class GroupController {
  constructor() {}

  /**
   * Admin will login by required data first then can create group
   * @summary Admin will login throuh email and password then will give data to create group
   * @param data   Group name , admin id and email
   * @returns
   */
  @Security("api_key")
  @Post("createGroup")
  async createGroup(@Body() data: IGroupReqSave): Promise<IGroupRes> {
    let resp: IGroupRes = <any>(
      await new GroupRespository().createGroup(<IGroupReqSave>data)
    );
    let obj: any = {};

    if (resp) {
      obj._id = resp._id;
      obj.name = resp.name;
      obj.users = resp.users;
      obj.messages = resp.messages;
      obj.message = "Group created";
    } else {
      obj.message = "Group not created";
    }

    return <IGroupRes>obj;
  }

  /**
   * Admin will login by required data first then can add user to secific group
   * @summary Admin will login throuh email and password then will give user data to add into group
   * @param data Group id , user id and  email
   * @returns
   */
  @Security("api_key")
  @Post("addUserToGroup")
  async addUserToGroup(
    @Body() data: IGroupReqAddUserToGroup
  ): Promise<IGroupRes> {
    let resp: IGroupRes = <any>(
      await new GroupRespository().addUserToGroup(<IGroupReqAddUserToGroup>data)
    );
    let obj: any = {};

    if (resp) {
      obj._id = resp._id;
      obj.name = resp.name;
      obj.users = resp.users;
      obj.messages = resp.messages;
      obj.message = "User added in group";
    } else {
      obj.message = "User not added in group";
    }
    return <IGroupRes>obj;
  }

  /**
   * User can send messsage to secific group
   * @summary User can send messsage by specific group id
   * @param data Group id , user id,email and message
   * @returns
   */
  // @Security("api_key")
  @Post("sendMessageToGroup")
  async sendMessageToGroup(
    @Body() data: IGroupReqsendMessageToGroup
  ): Promise<IGroupRes> {
    let resp: IGroupRes = <any>(
      await new GroupRespository().sendMessageToGroup(
        <IGroupReqsendMessageToGroup>data
      )
    );
    let obj: any = {};

    if (resp) {
      obj._id = resp._id;
      obj.name = resp.name;
      obj.users = resp.users;
      obj.messages = resp.messages;
      obj.message = "Message send in group";
    } else {
      obj.message = "Message not send in group";
    }
    return <IGroupRes>obj;
  }
  /**
   * Admin will login by required data first then got to proected route to check all messages
   * @summary Admin will login to all messages from specific group
   * @param data group Id
   * @returns
   */
  @Security("api_key")
  @Post("checkMessagesFromGroup")
  async checkMessagesFromGroup(
    @Body() data: IGroupReqcheckMessagesFromGroup
  ): Promise<IGroupRes> {
    let resp: IGroupRes = <any>(
      await new GroupRespository().checkMessagesFromGroup(
        <IGroupReqcheckMessagesFromGroup>data
      )
    );
    let obj: any = {};
    console.log(resp);
    if (resp) {
      obj._id = resp._id;
      obj.messages = resp.messages;
      obj.message = "All Messages in group";
    } else {
      obj.message = "Not Messages in group";
    }
    return <IGroupRes>obj;
  }

  /**
   * Admin will login by required data first then search according to need
   * @summary Admin will login to to search specific word in all group
   * @param data  word
   * @returns
   */
  @Security("api_key")
  @Post("specificeWordSearch")
  async specificeWordSearch(
    @Body() data: IGroupReqSpecificeWordSearch
  ): Promise<IGroupRes> {
    let resp: IGroupRes[] = <any>(
      await new GroupRespository().specificeWordSearch(
        <IGroupReqSpecificeWordSearch>data
      )
    );

    let obj: any = {};

    if (resp.length > 0) {
      obj.messages = resp;
      let filter: any[] = [];
      resp.filter((d, i) => (filter = filter.concat(d.messages)));

      obj.message = `${data.word} ${filter.length} times in all groups`;
    } else {
      obj.message = `${data.word} word not exist in all groups`;
    }
    console.log(resp);

    return <IGroupRes>obj;
  }
  /**
   * Admin will login by required data first then search according to need
   * @summary Admin will login to to search specific word of specific user in all group
   * @param data  user id and word
   * @returns
   */
  @Security("api_key")
  @Post("specificUserWordSearch")
  async specificUserWordSearch(
    @Body() data: IGroupReqSpecificUserWordSearch
  ): Promise<IGroupRes> {
    let resp: IGroupRes[] = <any>(
      await new GroupRespository().specificUserWordSearch(
        <IGroupReqSpecificUserWordSearch>data
      )
    );

    let obj: any = {};

    if (resp.length > 0) {
      obj.messages = resp;
      let filter: any[] = [];
      resp.filter((d, i) => (filter = filter.concat(d.messages)));

      obj.message = `${data.word} ${filter.length} times in all groups`;
    } else {
      obj.message = `${data.word} word not exist in all groups`;
    }
    console.log(resp);

    return <IGroupRes>obj;
  }
}
