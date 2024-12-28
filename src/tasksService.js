import { readFile, writeFile } from 'node:fs/promises';

export const tasksService = (() => {

	const saveTasks = async (tasks) => {
		try {
			await writeFile(process.env.TASKS_PATH, JSON.stringify(tasks, null, 3), 'utf8');
		} catch (err) {
			console.error('Can not save tasks', err.message);
			throw new Error('Can not save tasks.');
		}
	};

	const getTasks = async () => {
		try {
			const content = await readFile(process.env.TASKS_PATH, { encoding: 'utf8' });
			const json = JSON.parse(content);
			return json;
		} catch (err) {
			console.error('Can not get tasks. Verify tasks file path.', err.message);
			throw new Error('Can not get tasks.');
		}
	};

	const findTask = async (taskId) => {
		const tasks = await getTasks();
		const task = tasks.find(task => taskId == task.id);
		return task ? task : { error: 'Task not found!' };
	}

	const createTask = async (task) => {
		const tasks = await getTasks();
		const now = Date.now();
		const newTask = { id: tasks.length + 1, ...task, createdAt: now, updatedAt: now };
		tasks.push(newTask);
		await saveTasks(tasks);
		return tasks;
	};

	const deleteTask = async (taskId) => {
		const tasks = await getTasks();
		const index = tasks.findIndex(task => task.id == taskId);
		if (index === -1) return { error: 'Task not found!' };
		tasks.splice(index, 1);
		await saveTasks(tasks);
		return tasks;
	};

	const updateTask = async (updated) => {
		const tasks = await getTasks();
		let taskIndex = tasks.findIndex(task => task.id == updated.id);
		if (taskIndex < 0) return { error: 'Task not found!' };
		tasks[taskIndex] = { ...updated, createdAt: tasks[taskIndex].createdAt, updatedAt: Date.now() }
		await saveTasks(tasks);
		return tasks;
	};

	return { getTasks, findTask, createTask, deleteTask, updateTask };
})();
