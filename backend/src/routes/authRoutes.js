import express from 'express';
import { register } from '../services/authServices.js';

const router = express.Router();

router.post('/register', register);

export default router;


