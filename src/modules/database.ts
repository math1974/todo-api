import { DataSource } from 'typeorm';
import { TaskEntity } from '../entities';
import environments from '../config/environments';

export default new DataSource({
	type: 'postgres',
	host: environments.database.host,
	port: Number(environments.database.port),
	username: environments.database.user,
	password: environments.database.password,
	database: environments.database.name,
	entities: [TaskEntity],
	synchronize: true
});
