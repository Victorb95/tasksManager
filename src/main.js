import 'dotenv/config';
import express from 'express';
import { loadTasks } from './utils.js'
import { tasksManager } from './tasksManager.js'

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/', (_, res) => {
	res.json(tasksManager.getTasks())
})
app.get('/:id', (req, res) => {
	res.json(tasksManager.findTask(req.params.id))
})
app.post('/create', (req, res) => {
	res.json(tasksManager.createTask(req.body))
})
app.post('/update', (req, res) => {
	res.json(tasksManager.updateTask(req.body))
})
app.post('/delete', (req, res) => {
	res.json(tasksManager.deleteTask(req.body.id))
})

tasksManager.init().then(() => {
	app.listen(PORT, () => {
		console.log(`App Running on PORT: ${PORT}`);
	})
})






