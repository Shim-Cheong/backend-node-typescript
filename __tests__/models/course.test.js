import { Semester, University } from '../../src/interfaces/ICourse';
import Course from '../../src/models/course';

describe("Course model unit tests", () => {
  test("Get file name from filter view", () => {
    const filterView = {
      year: 2020,
      semester: Semester.SPRING,
      university: University.UNDERGRADUATE
    }

    const courseModel = new Course();
    

  })
});
