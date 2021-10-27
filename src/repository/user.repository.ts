import { userModel } from "../model/user.model";
import { IUserReqSave, IUserReqUpdate } from "../type/request/user.request";

export class UserRespository {
  constructor() {}
  registerDataUser(data: IUserReqSave) {
    return new userModel(data).save();
  }
  checkDataUser() {
    return userModel.find();
  }
  updateDataUser(data: IUserReqUpdate) {
    return userModel.findOneAndUpdate(
      { _id: data._id },
      {
        name: data.name,
        email: data.email,
        password: data.password,
        pictureUrl: data.pictureUrl,
      },
      { new: true }
    );
  }

  searchDataUser(data: string) {
    return userModel.findOne({ email: data });
  }
  findUserPassword(id: string) {
    return userModel.findById({ _id: id });
  }
}
