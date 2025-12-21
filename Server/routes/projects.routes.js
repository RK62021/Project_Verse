import Router from 'express';
import projectsController from '../controllers/projects.controller.js';
import { authenticateCookie } from '../middlewares/cookieAuth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

// Public routes
router.get('/', projectsController.getAllProjects);
router.get('/:id', projectsController.getProjectById);
router.get('/user/:userId', projectsController.getProjectsByUserId);

// Protected routes
router.post('/', authenticateCookie, upload.single('projectImage'), projectsController.createProject);
router.put('/:id', authenticateCookie, projectsController.updateProject);
router.delete('/:id', authenticateCookie, projectsController.deleteProject);
router.post('/:projectId/like', authenticateCookie, projectsController.toggleLikeProject);
router.post('/:projectId/view', authenticateCookie, projectsController.addUniqueView);

export default router;