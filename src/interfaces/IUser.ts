export type IUserVo = {
  id: string;
  studentId: string;
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUser {
  id: string;
  studentId: string;
  name: string;
  email: string;
  password: string;
  salt: string;

  toObject(): IUserVo;
  create(props: IUserVo): IUser;
  findOneById(id: string): IUser;
}

/* 사용자가 입력하는 항목 */
export interface IUserInputDTO {
  id: string,
  studentId: string;
  name: string;
  email: string;
  password: string;
}