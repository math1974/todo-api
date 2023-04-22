import express, { Express } from 'express';

import DatabaseModule from './src/modules/database';
import RoutingModule from './src/modules/route';

import dotenv from 'dotenv';
import cors from 'cors';

import environments from './src/config/environments';

export default class Server {
	private _app: Express;
	private routingModule: RoutingModule;

	public constructor() {
		this._app = express();
		this.routingModule = new RoutingModule();

		if (process.env.NODE_ENV !== 'production') {
			dotenv.config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` });
		}
	}

	public async start() {
		this._app.use(express.json());
		this._app.use(cors());

		const serverPort = Number(environments.port ?? 3000);

		await DatabaseModule.initialize();

		this._app.use(this.routingModule.setup());

		this._app.listen(serverPort, () => {
			console.log('Server running on port ' + serverPort);
		});
	}

	get app() {
		return this._app;
	}
}
