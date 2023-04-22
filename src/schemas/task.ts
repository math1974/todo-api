import { z } from 'zod';
import { DateInstance } from '../utils';
import { Priority } from '../enumns/priority';
import { Status } from '../enumns/status';

const paramsSchema = z.object({
	id: z.string().refine((value) => ~~value)
});

const upsertTaskSchema = z.object({
	title: z.string().max(255),
	description: z.string().optional(),
	priority: z.nativeEnum(Priority).default(Priority.normal).optional(),
	due_date: z
		.string()
		.refine((date) => new DateInstance(date).isValid())
		.optional(),
	status: z.nativeEnum(Status).default(Status.TO_DO).optional()
});

export default {
	create: {
		body: upsertTaskSchema
	},
	update: {
		body: upsertTaskSchema,
		params: paramsSchema
	},
	find: {
		params: paramsSchema
	},
	list: {
		query: z
			.object({
				status: z.nativeEnum(Status).optional(),
				priority: z.nativeEnum(Priority).optional()
			})
			.partial()
	}
};
