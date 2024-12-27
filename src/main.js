import 'dotenv/config';
import express from 'express';
import { tasksManager } from './tasksManager.js'

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
	const resp = await tasksManager.getTasks(req);
	res.json(resp);
})
app.get('/:id', async (req, res) => {
	const resp = await tasksManager.findTask(req);
	res.json(resp);
})
app.post('/create', async (req, res) => {
	const resp = await tasksManager.createTask(req);
	res.json(resp);
})
app.post('/update', async (req, res) => {
	const resp = await tasksManager.updateTask(req);
	res.json(resp);
})
app.post('/delete', async (req, res) => {
	const resp = await tasksManager.deleteTask(req);
	res.json(resp);
})

app.listen(PORT, () => {
	console.log(`App Running on PORT: ${PORT}`);
})






