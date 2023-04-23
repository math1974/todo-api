import { Request, Response } from 'express';
import { TaskEntity } from '../entities';
import { TaskService } from '../services';

export default class TaskController {
	service: TaskService;

	public constructor() {
		this.service = new TaskService();

		this.create = this.create.bind(this);
		this.list = this.list.bind(this);
		this.update = this.update.bind(this);
		this.find = this.find.bind(this);
		this.remove = this.remove.bind(this);
	}

	async create(req: Request, res: Response): Promise<Response<TaskEntity>> {
		const response = await this.service.create(req.body);

		return res.json({
			data: response
		});
	}

	async update(req: Request, res: Response): Promise<Response<TaskEntity>> {
		try {
			const response = await this.service.update({
				filter: {
					id: Number(req.params.id)
				},
				changes: req.body
			});

			return res.json({
				data: response
			});
		} catch (err: unknown) {
			return res.status(500).json({
				error: err instanceof Error ? err.message : 'ERROR'
			});
		}
	}

	async list(req: Request, res: Response): Promise<Response<TaskEntity[]>> {
		const response = await this.service.list();

		return res.json({ data: response });
	}

	async find(req: Request, res: Response): Promise<Response<TaskEntity>> {
		try {
			const response = await this.service.find(req.params);

			return res.json({
				data: response
			});
		} catch (err: unknown) {
			return res.status(500).json({
				error: err instanceof Error ? err.message : 'ERROR'
			});
		}
	}

	async remove(req: Request, res: Response): Promise<Response<TaskEntity[]>> {
		try {
			await this.service.remove(req.params);

			return res.json({
				data: true
			});
		} catch (err: unknown) {
			return res.status(500).json({
				error: err instanceof Error ? err.message : 'ERROR'
			});
		}
	}
}
