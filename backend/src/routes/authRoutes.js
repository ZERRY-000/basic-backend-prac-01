import express from 'express';
import { register } from '../services/authServices';

const router = express.Router();

router.post('/', register);

export default router;


