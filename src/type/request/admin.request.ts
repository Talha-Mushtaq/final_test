export interface IAdminReqSave {
  name: string;
  email: string;
  password: string;
}

export interface IAdminReqLogin {
  email: string;
  password: string;
}
