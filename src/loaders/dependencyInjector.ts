import {Container, Service} from "typedi";
import CourseInstance from '../models/course';

export default () => {
  try {
    Container.set('CourseInstance', CourseInstance);
    
  } catch (e) {
    throw e;
  }
} 

