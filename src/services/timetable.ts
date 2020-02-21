import { CourseVo, ICourse, IWishList } from '../interfaces/ICourse';


export default class TimetableService {
  private wishList: IWishList;
  
  constructor(wishList: IWishList){
    this.wishList = wishList;
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