import { Router, Request, Response, NextFunction } from "express";
import CourseService from "../../services/course";
import Container from "typedi";

const route = Router();

export default (app: Router) => {
  app.use("/course", route);

  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const courseServiceInstance = Container.get(CourseService);
    const filterView = {
      year: req.query.year,
      semester: req.query.semester,
      university: req.query.university,
    }

    const { courses } = await courseServiceInstance.List(filterView);

    return res.send({ courses });
  });
};
