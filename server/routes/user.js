import express from 'express';
import {profile} from '../controllers/user.js';

const router = express.Router();


router.get('/profile', profile);

export default router;


