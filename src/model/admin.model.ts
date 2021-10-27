import { model, Schema } from "mongoose";
import { IAdmin } from "../type/document/admin.document";

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
export const adminModel = model<IAdmin>("admin", adminSchema);
