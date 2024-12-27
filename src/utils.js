import { readFile } from 'node:fs/promises';

export const loadTasks = async (path) => {
	try {
		const content = await readFile(path, { encoding: 'utf8' });
		const json = JSON.parse(content);
		return json;
	} catch (err) {
		console.log(err.message);
		throw err;
	}
};

export const getTasks = () => {

}