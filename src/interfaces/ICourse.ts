export enum Undergraduate {
  GS, // 기초교육학부
  PS, // 물리전공
  CH, // 화학전공
  BS, // 생명과학전공
  EC, // 전기전자컴퓨터전공
  MC, // 기계공학전공
  MA, // 신소재공학전공
  EV, // 지구환경공학전공
  UC, // 대학공통
  MM, // 수학부전공
  ET, // 에너지부전공
  MD, // 의생명공학부전공
  CT, // 문화기술 부전공
  IR, // 지능로봇 부전공
  // 인문학∙사회과학 부전공
  // 언어교육센터
  // SW교육센터
}

export type CourseTime = {
  day: string;
  startTime: string;  // XX:XX 형식
  endTime: string;    // XX:XX 시간
}

export type Credit = {
  lecture: number;    // 강의
  experiment: number;  // 실험
  grades: number;   // 학점
}

export type FilterView = {
  university: "UNDERGRADUATE" | "GRADUATE";
  year: number;
  semester: "SPRING" | "SUMMER" | "FALL" | "WINTER";
}


export type CourseVo = {
  _id: number;
  department: any; // 개설 부서
  code: string;   // 교과목 코드(숫자 4자리)
  classNumber: number;   // 분반
  name: string;   // 교과목명
  division: "필수" | "선택" | "연구";     // 이수구분 필수, 선택, 연구
  type: "교과" | "논문연구" | "세미나";     // 교과연구 교과, 논문연구, 세미나
  professors: string[];   // 담당교수
  level: string   // 과정 구분
  credit: Credit;   // 강/실/학
  courseTime: CourseTime[];    // 시간표
  class: string;    // 강의실
  size: number;     // 수강정원
  isLiberalArts: boolean;     // 교양 여부
}

export interface ICourse {

  find(filterView: FilterView): Promise<CourseVo[]>;
  // findOneById(id: number): CourseVo;
  
  // toObject(): CourseVo;

}

export interface IWishList {
  items: ICourse[];
}

// 아래는 참고사항

/* 
const course = {
  _id: 
  department: ; // 개설 부서
  code: ;   // 교과목 코드(숫자 4자리)
  classNumber: ;   // 분반
  name: ;   // 교과목명
  division: ;     // 이수구분 필수, 선택, 연구 - required, optional, research
  type: ;     // 교과연구 교과, 논문연구, 세미나 - regular, research, seminar
  professors: [
   'XXX', 'XXX', 'XXX' 
  ];   // 담당교수
  level:    // 과정 구분
  credit: {
    lecture: 3
    experiment: 0
    grades: 3

  };   // 강/실/학
  timetable: [
    {
      day: '화';
      startTime: string;  // XX:XX 형식
      endTime: string;    // XX:XX 시간
    }, 
    {
      day: '목';
      startTime: string;  // XX:XX 형식
      endTime: string;    // XX:XX 시간
    }
  ];    // 시간표
  class: ;    // 강의실
  size: ;     // 수강정원
  isLiberalArts: boolean;     // 교양 여부
} */