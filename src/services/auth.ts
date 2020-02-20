import jwt from 'jsonwebtoken';
import config from '../config';
import argon2 from 'argon2';
import { UserVo, IUser, IUserInputDTO } from '../interfaces/IUser';
import { randomBytes } from 'crypto';

export default class AuthService {
  private userModel: IUser;
  
  constructor(userModel: IUser){
    this.userModel = userModel;
  }

  public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: UserVo; token: string }> {
    try {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt })
      const userRecord = await this.userModel.create({
        ...userInputDTO,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });
      
      const token = this.generateToken(userRecord)

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      
      Reflect.deleteProperty(userRecord, 'password');
      Reflect.deleteProperty(userRecord, 'salt');
      return { user: userRecord, token };
    } catch (e) {
      throw e;
    }
  }

  private generateToken(user: UserVo):string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        studentId: user.studentId,
      },
      config.jwtSecret,
    )
  }
  
} 