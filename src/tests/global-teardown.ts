async function close(): Promise<boolean> {
	await globalThis.database.destroy();

	return true;
}

export default close;
