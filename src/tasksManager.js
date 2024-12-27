import { tasksService } from './tasksService.js';

export const tasksManager = (() => {
	const getTasks = (req) => {
		return tasksService.getTasks();
	}

	const findTask = (req) => {
		const { id } = req.params;
		if (!id) return { error: 'Must pass an id' };
		return tasksService.findTask(id);
	};

	const createTask = (req) => {
		let { title, description } = req.body;
		title = title.trim();
		description = description.trim();
		if (!title) return { error: 'Title cannot be empty!' };
		if (!description) return { error: 'Description cannot be empty!' };

		return tasksService.createTask({ title, description });
	};

	const deleteTask = (req) => {
		const { id } = req.body;
		if (!id) return { error: 'Must pass an id' };
		return tasksService.deleteTask(id);
	};

	const updateTask = (req) => {
		const { id, title, description } = req.body;
		if (!id) return { error: 'ID cannot be empty!' };
		if (!title?.trim()) return { error: 'Title cannot be empty!' };
		if (!description?.trim()) return { error: 'Description cannot be empty!' };

		return tasksService.updateTask({ id, title, description });
	};

	return { getTasks, findTask, createTask, deleteTask, updateTask };
})();
