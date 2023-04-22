import { Router } from 'express';

import { TaskRoutes } from '../routes';

export default class Routes {
	public routes: Router;
	private taskRoutes: TaskRoutes;

	constructor() {
		this.routes = Router();

		this.taskRoutes = new TaskRoutes();
	}

	start() {
		this.routes.use('/tasks', this.taskRoutes.setup());
	}
}
