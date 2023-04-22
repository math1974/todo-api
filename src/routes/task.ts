import { TaskController } from '../controllers';

import { TaskSchema } from '../schemas';
import SchemaValidator from '../utils/validator';

import BaseRoutes from './base';

export default class TaskRoutes extends BaseRoutes {
	taskController: TaskController;

	constructor() {
		super();

		this.taskController = new TaskController();
	}

	setup() {
		this.route.get('/', SchemaValidator.validate(TaskSchema.list), this.taskController.list);
		this.route.post('/', SchemaValidator.validate(TaskSchema.create), this.taskController.create);
		this.route.get('/:id', SchemaValidator.validate(TaskSchema.find), this.taskController.find);
		this.route.put('/:id', SchemaValidator.validate(TaskSchema.update), this.taskController.update);
		this.route.delete('/:id', SchemaValidator.validate(TaskSchema.find), this.taskController.remove);

		return this.route;
	}
}
