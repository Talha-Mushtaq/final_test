import { model, Schema } from "mongoose";
import { IGroup } from "../type/document/group.document";

const groupSchema = new Schema({
  name: { type: String, required: true },
  users: { type: [Object], required: false },
  messages: { type: [Object], required: false },
});

export const groupModel = model<IGroup>("group", groupSchema);
