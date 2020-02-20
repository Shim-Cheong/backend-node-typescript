export type UserVo = {
  id: string;
  studentId: string;
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUser {
  toObject(): UserVo;
  create(props: UserVo): UserVo;
  findOneById(id: string): UserVo;
}

/* 사용자가 입력하는 항목 */
export interface IUserInputDTO {
  id: string,
  studentId: string;
  name: string;
  email: string;
  password: string;
}