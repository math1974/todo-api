import { Router } from 'express';

import { TaskRoutes } from '../routes';

export default class RoutingModule {
	private routes: Router;
	private taskRoutes: TaskRoutes;

	constructor() {
		this.routes = Router();
		this.taskRoutes = new TaskRoutes();
	}

	setup() {
		this.routes.use('/tasks', this.taskRoutes.setup());

		return this.routes;
	}
}
