import DatabaseModule from '../modules/database';

async function setup(): Promise<boolean> {
	if (!DatabaseModule.isInitialized) {
		await DatabaseModule.initialize();
	}

	globalThis.database = DatabaseModule;

	return true;
}

export default setup;
