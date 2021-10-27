import { model, Schema } from "mongoose";
import { IUser } from "../type/document/user.document";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pictureUrl: { type: String, required: true },
});
export const userModel = model<IUser>("user", userSchema);
