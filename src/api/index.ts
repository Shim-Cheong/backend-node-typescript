import { Router } from 'express';
import course from './routes/course';
// import auth from './routes/auth';
// import user from './routes/user';
// import agendash from './routes/agendash';


// guaranteed to get dependencies
export default () => {
	const app = Router();
	course(app);
	// user(app);
	// agendash(app);

	return app
}