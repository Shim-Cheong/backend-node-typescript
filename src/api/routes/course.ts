import { Router, Request, Response, NextFunction } from "express";
import CourseService from "../../services/course";
import Container from "typedi";

const route = Router();

export default (app: Router) => {
  app.use("/course", route);

  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const courseServiceInstance = Container.get(CourseService);
    const { courses } = await courseServiceInstance.List(req.body.filterView);

    return res.send({ courses });
  });
};
