import { Service, Inject } from 'typedi';
import { CourseVo, ICourse, IWishList, FilterView } from '../interfaces/ICourse';

@Service()
export default class CourseService {
  courseModel: ICourse;

  constructor(@Inject('CourseInstance') courseModel: ICourse){
    this.courseModel = courseModel;
  }

  /**
   * 대학분류: GIST대학/대학원 
   * 년도/학기: 2020/spring
   */
   
  
  public async List(filterView: FilterView): Promise<{ courses: CourseVo[]; }> {
    try {
      const courses = await this.courseModel.find(filterView);

      return { courses };
    } catch (e) {
      throw e;
    }
  }
} 