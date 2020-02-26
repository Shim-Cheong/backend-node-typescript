import {
  ICourse,
  FilterView,
  CourseVo,
  CourseTime
} from "../interfaces/ICourse";
import parse from "csv-parse";
import fs from "fs";
import S3 from "aws-sdk/clients/s3";
import course from "../api/routes/course";

const s3 = new S3();

class Course implements ICourse {
  public find(filterView: FilterView): Promise<CourseVo[]> {
    const bucket = "shim-chung-courses";
    const fileName = this.getFileName(filterView) + ".csv";
    const readStream = s3
      .getObject({ Bucket: bucket, Key: fileName })
      .createReadStream();
    // const readStream = fs.createReadStream(fileName);
    const parser = parse({ columns: true });

    const courses: CourseVo[] = [];

    readStream.pipe(parser).on("data", data => {
      
      if (data.professors) {
        data.professors = data.professors.split("/");
      } else {
        data.professors = [];
      }

      // 강/실/학 변경
      if (data.credit) {
        data.credit = {
          lecture: data.credit.split("/")[0],
          experiment: data.credit.split("/")[1],
          grades: data.credit.split("/")[2]
        };
      }

      if (data.courseTime) {
        // 강의 시간 배열로 변경
        data.courseTime = data.courseTime.split("/").map(
          // x 형태: 화 10:30~12:00/목 10:30~12:00/금 09:00~10:00
          x =>
            <CourseTime>{
              day: x.split(" ")[0],
              startTime: x.split(" ")[1].split("~")[0],
              endTime: x.split(" ")[1].split("~")[1]
            }
        );
      } else {
        // 없을 경우 빈 배열
        data.courseTime = [];
      }
      courses.push(data);
    });

    return new Promise((resolve, reject) => {
      readStream.on("finish", () => {
        resolve(courses);
      });
      readStream.on("error", err => {
        reject(err);
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

const CourseInstance = new Course();
export default CourseInstance;
