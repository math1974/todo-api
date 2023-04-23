import { TaskEntity } from '../entities';
import { Repository } from 'typeorm';
import DatabaseModule from '../modules/database';
import { Priority } from '../enumns/priority';
import { Status } from '../enumns/status';

type Filter = {
	id: number;
};

type Insert = {
	title: string;
	description?: string;
	priority?: Priority;
	status?: Status;
	due_date: string;
};

type Update = {
	filter: Filter;
	changes: Insert;
};

export default class TaskService {
	repository: Repository<TaskEntity>;

	public constructor() {
		this.repository = DatabaseModule.getRepository(TaskEntity);
	}

	async create(data: TaskEntity): Promise<TaskEntity> {
		const task = await this.repository.save(data);

		return task;
	}

	async list(): Promise<TaskEntity[]> {
		return this.repository.find({
			where: {
				is_deleted: false
			},
			order: {
				due_date: 'ASC',
				priority: 'DESC'
			}
		});
	}

	async find(filter): Promise<TaskEntity> {
		const task: TaskEntity | null = await this.repository.findOneBy({
			id: Number(filter.id),
			is_deleted: false
		});

		if (!task) {
			throw new Error('NOT_FOUND');
		}

		return task;
	}

	async remove(filter): Promise<boolean> {
		const task: TaskEntity | null = await this.repository.findOneBy({
			id: Number(filter.id),
			is_deleted: false
		});

		if (!task) {
			throw new Error('UNABLE_TO_MANAGE_TASK');
		}

		await this.repository.update(filter.id, {
			is_deleted: true
		});

		return true;
	}

	async update({ filter, changes }: Update): Promise<TaskEntity> {
		console.log(changes, 'changes');
		const task = await this.repository.findOneBy({
			id: filter.id,
			is_deleted: false
		});

		if (!task) {
			throw new Error('NOT_FOUND');
		}

		await this.repository.update(filter.id, {
			title: changes.title,
			description: changes.description,
			due_date: changes.due_date,
			priority: changes.priority,
			status: changes.status
		});

		return this.find(filter);
	}
}
