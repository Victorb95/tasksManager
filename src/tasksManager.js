import { log } from 'node:console';
import { readFile, writeFile } from 'node:fs/promises';

export const tasksManager = (() => {
	let tasks = [];
	const jsonPath = 'src/tasks.json';

	const init = async () => {
		try {
			const content = await readFile(jsonPath, { encoding: 'utf8' });
			tasks = JSON.parse(content);
		} catch (err) {
			console.error('Can not initialize Tasks:', err.message);
			throw new Error('Can not initialize Tasks. Verify JSON file.');
		}
		return tasks;
	};

	const saveTasks = async () => {
		try {
			await writeFile(jsonPath, JSON.stringify(tasks, null, 3), 'utf8');
		} catch (err) {
			console.error('Can not save tasks', err.message);
			throw new Error('Can not save tasks.');
		}
	};

	const getTasks = () => [...tasks];

	const findTask = (params) => {
		const task = tasks.find(task => task.id == params.id);
		return task || { error: 'Task not found!' };
	};

	const createTask = async (task) => {
		const { title, description } = task;
		if (!title?.trim()) return { error: 'Title cannot be empty!' };
		if (!description?.trim()) return { error: 'Description cannot be empty!' };

		const newTask = { id: tasks.length + 1, ...task };
		tasks.push(newTask);
		await saveTasks();
		return newTask;
	};

	const deleteTask = async (params) => {
		const index = tasks.findIndex(task => task.id == params.id);
		if (index === -1) return { error: 'Task not found!' };

		tasks.splice(index, 1);
		await saveTasks();
		return { message: 'Task deleted successfully!' };
	};

	const updateTask = async (updated) => {
		const { id, title, description } = updated;
		if (!id) return { error: 'ID cannot be empty!' };
		if (!title?.trim()) return { error: 'Title cannot be empty!' };
		if (!description?.trim()) return { error: 'Description cannot be empty!' };

		const task = tasks.find(task => task.id == id);
		if (!task) return { error: 'Task not found!' };

		task.title = title;
		task.description = description;

		await saveTasks();
		return task;
	};

	return { getTasks, init, findTask, createTask, deleteTask, updateTask };
})();
