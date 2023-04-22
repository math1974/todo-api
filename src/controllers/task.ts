import { Request, Response } from 'express';
import DatabaseModule from '../modules/database';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entities';

export default class TaskController {
	taskRepository: Repository<TaskEntity>;

	public constructor() {
		this.taskRepository = DatabaseModule.getRepository(TaskEntity);

		this.create = this.create.bind(this);
		this.list = this.list.bind(this);
		this.update = this.update.bind(this);
		this.find = this.find.bind(this);
		this.remove = this.remove.bind(this);
	}

	async create(req: Request, res: Response): Promise<Response<TaskEntity>> {
		const task: TaskEntity = await this.taskRepository.save(req.body);

		return res.json(task);
	}

	async update(req: Request, res: Response): Promise<Response<TaskEntity>> {
		const task: TaskEntity = await this.taskRepository.save({
			id: req.params.id,
			...req.body
		});

		return res.json({
			data: task
		});
	}

	async list(req: Request, res: Response): Promise<Response<TaskEntity[]>> {
		const task: TaskEntity[] = await this.taskRepository.find({
			where: {
				is_deleted: false
			},
			order: {
				due_date: 'ASC',
				priority: 'DESC'
			}
		});

		return res.json({
			data: task
		});
	}

	async find(req: Request, res: Response): Promise<Response<TaskEntity>> {
		const task: TaskEntity | null = await this.taskRepository.findOneBy({
			id: Number(req.params.id),
			is_deleted: false
		});

		return res.json({
			data: task
		});
	}

	async remove(req: Request, res: Response): Promise<Response<TaskEntity[]>> {
		const task: TaskEntity | null = await this.taskRepository.findOneBy({
			id: Number(req.params.id),
			is_deleted: false
		});

		if (!task) {
			return res.status(401).json({
				message: 'UNABLE_TO_MANAGE_TASK'
			});
		}

		await this.taskRepository.update(req.params.id, {
			is_deleted: true
		});

		return res.json({
			data: true
		});
	}
}
