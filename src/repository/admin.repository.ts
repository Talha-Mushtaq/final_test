import { adminModel } from "../model/admin.model";

export class AdminRespository {
  constructor() {}
  loginAdmin(data: string) {
    return adminModel.findOne({ email: data });
  }
}
