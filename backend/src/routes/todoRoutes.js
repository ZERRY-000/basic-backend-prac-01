import express from 'express';
import { createTodo, callTodoList, deleteTodo, doneTodo } from '../services/todoServices.js';

const router = express.Router();

router.get('/user/:id', callTodoList);
router.post('/create', createTodo);
router.delete('/delete/:id', deleteTodo);
router.put('/done/:id', doneTodo);

export default router;