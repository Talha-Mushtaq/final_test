export interface IUserReqSave {
  name: string;
  email: string;
  password: string;
  pictureUrl: string;
}
export interface IUserReqLogin {
  email: string;
  password: string;
}

export interface IUserReqUpdate {
  _id: string;
  name: string;
  email: string;
  password: string;
  pictureUrl: string;
}
