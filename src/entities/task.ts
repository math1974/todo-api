import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Priority } from '../enumns/priority';
import { Status } from '../enumns/status';

@Entity({
	name: 'tasks'
})
export default class Task extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'character varying',
		length: 255,
		nullable: false
	})
	title: string;

	@Column({
		type: 'varchar',
		nullable: true
	})
	description: string;

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.TO_DO
	})
	status: Status;

	@Column({
		type: 'enum',
		enum: Priority,
		default: Priority.normal
	})
	priority: Priority;

	@Column({
		type: 'timestamp',
		nullable: true,
		default: new Date()
	})
	due_date: Date;

	@Column({
		type: 'boolean',
		default: false,
		nullable: false
	})
	is_deleted: boolean;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
