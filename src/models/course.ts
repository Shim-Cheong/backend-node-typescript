import {
  ICourse,
  FilterView,
  CourseVo,
  CourseTime
} from "../interfaces/ICourse";
import parse from "csv-parse";
import fs from "fs";

export class Course implements ICourse {
  public find(filterView: FilterView): Promise<CourseVo[]> {
    const file = this.getFileName(filterView);
    const readStream = fs.createReadStream(`${file}.csv`);
    const parser = parse({ columns: true });

    const courses: CourseVo[] = [];

    parser.on("readable", () => {
      let record;
      while ((record = parser.read())) {
        // 교수님 명단 배열로 변경
        record.professors = record.professors.split("/");
        // 강/실/학 변경
        record.credit = {
          lecture: record.credit.split("/")[0],
          experiment: record.credit.split("/")[1],
          grades: record.credit.split("/")[2]
        };
        // 강의 시간 배열로 변경
        record.courseTime = record.courseTime.split("/").map(
          // x 형태: 화 10:30~12:00/목 10:30~12:00/금 09:00~10:00
          x =>
            <CourseTime>{
              day: x.split(" ")[0],
              startTime: x.split(" ")[1].split("~")[0],
              endTime: x.split(" ")[1].split("~")[1]
            }
        );

        courses.push(record);
      }
    });

    parser.on("error", err => {
      console.log(err);
    });

    readStream.pipe(parser);

    return new Promise((resolve, reject) => {
      readStream.on("close", () => {
        resolve(courses);
      });
    });
  }

  private getFileName(filterView: FilterView): string {
    return `${filterView.year}-${filterView.semester}-${filterView.university}`;
  }
}

async function test() {
  const courseModel = new Course();

  const filterView: FilterView = {
    year: 2020,
    semester: "SPRING",
    university: "UNDERGRADUATE"
  };

  const courses = await courseModel.find(filterView);
  console.log(courses);
  console.log(courses[0].courseTime);
}
