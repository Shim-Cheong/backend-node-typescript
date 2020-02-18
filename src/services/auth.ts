import jwt from 'jsonwebtoken';
import config from '../config';
import argon2 from 'argon2';
import { IUserVo, IUser, IUserInputDTO } from '../interfaces/IUser';
import { randomBytes } from 'crypto';

export default class AuthService {
  private userModel: IUser;
  
  constructor(userModel: IUser){
    this.userModel = userModel;
  }

  public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUserVo; token: string }> {
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

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user, token };
    } catch (e) {
      throw e;
    }
  }

  private generateToken(user: IUser):string {
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