import { IMessage, IUserInfo } from "../document/group.document";
export interface IGroupRes {
  _id: any;
  name: string;
  users: IUserInfo[];
  messages?: IMessage[];
  message?: string;
}
