import { Priority } from '../../enumns/priority';
import { TaskService } from '../../services';
import { DateInstance } from '../../utils';

const taskInfo = {
	title: 'title',
	description: 'description',
	priority: Priority.high,
	due_date: new DateInstance('2023-01-09', 'YYYY-MM-DD')
};

describe('TaskService', () => {
	describe('#create', () => {
		describe('with valid data', () => {
			it('should return the task created', async () => {
				const taskCreated = await TaskService.create(taskInfo);

				expect(taskCreated).toMatchObject(taskInfo);
			});
		});

		describe('with invalid data', () => {
			it('should return error', async () => {
				const error = await TaskService.create().catch((r) => r);

				expect(error).toMatchInlineSnapshot();
			});
		});
	});
});
