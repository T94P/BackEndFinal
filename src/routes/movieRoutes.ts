import { Router } from 'express';
import express from 'express';
import movieController from '../controllers/movieController';
import { createMovie, getAllMovies, updateMovie, deleteMovie } from '../controllers/movieController';
import { authMiddleware } from '../middleware/authMiddleware';
import { adminMiddleware } from '../middleware/adminMiddleware';

const router = express.Router();

router.post('/', [authMiddleware, adminMiddleware], movieController.createMovie);
router.put('/:id', [authMiddleware, adminMiddleware], movieController.updateMovie);
router.delete('/:id', [authMiddleware, adminMiddleware], movieController.deleteMovie);
router.get('/',[authMiddleware], movieController.getAllMovies);

export default router;