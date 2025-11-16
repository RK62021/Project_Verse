import { Router } from 'express';
import authRoutes from './auth.routes.js';
// import profileRoutes from './profile.routes.js';
// import projectRoutes from './projects.routes.js';
const router = Router();

router.use('/auth', authRoutes);
// router.use('/profile', profileRoutes);
// router.use('/projects', projectRoutes);

export default router;
