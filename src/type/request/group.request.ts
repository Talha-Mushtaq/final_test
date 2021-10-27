import { IMessage, IUserInfo } from "../document/group.document";

export interface IGroupReqSave {
  name: string;
  users: IUserInfo;
}

export interface IGroupReqAddUserToGroup {
  _id: string;
  user: IUserInfo;
}
export interface IGroupReqsendMessageToGroup {
  _id: string;
  messages: IMessage;
}
export interface IGroupReqcheckMessagesFromGroup {
  _id: string;
}
export interface IGroupReqSpecificeWordSearch {
  word: string;
}
export interface IGroupReqSpecificUserWordSearch {
  id: string;
  word: string;
}
