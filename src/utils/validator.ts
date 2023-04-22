import { ZodSchema } from 'zod';
import HttpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';

type SchemaObject = {
	query?: ZodSchema;
	body?: ZodSchema;
	params?: ZodSchema;
};

type Middleware = (req: Request, res: Response, next: NextFunction) => Response | void;

export default class SchemaValidator {
	static isValid(schema: SchemaObject, req: Request) {
		try {
			Object.keys(schema).forEach((key: string): void => {
				const currentSchema: ZodSchema = schema[key];
				console.log(currentSchema, 'currentSchema');
				console.log(schema[key], 'schema[key]');

				const valid = currentSchema.parse(req[key]);
				console.log(valid, 'valid');
			});

			return { success: true };
		} catch (error) {
			return { error };
		}
	}

	static validate(schema: SchemaObject): Middleware {
		return (req: Request, res: Response, next: NextFunction): Response | void => {
			const { error } = SchemaValidator.isValid(schema, req);

			if (error) {
				return res.status(HttpStatus.BAD_REQUEST).json({
					status: 'error',
					message: 'INVALID_SCHEMA'
				});
			}

			return next();
		};
	}
}
