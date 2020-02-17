export type IUserVo = {
  id: string;
  studentNumber: string;
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUser {
  id: string;
  studentNumber: string;
  name: string;
  email: string;
  password: string;
  salt: string;

  toObject(): IUserVo;
  /*  @TODO: parameter 변수명 확인 */
  create(props: IUserVo): IUser;
  findOneById(id: string): IUser;
}

/* 사용자가 입력하는 항목 */
export interface IUserInputDTO {
  id: string,
  studentNumber: string;
  name: string;
  email: string;
  password: string;
}