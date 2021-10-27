import { Document } from "mongoose";

export interface IUserInfo {
  id: string;
  email: string;
}
export interface IMessage {
  id: string;
  email: string;
  message: string;
}
export interface IGroup extends Document {
  name: string;
  users: IUserInfo[];
  messages: IMessage[];
}
