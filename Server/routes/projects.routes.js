import Router from 'express';
const router = Router();

router.post('/createProject');
router.get('/getProjects');
router.put('/updateProject/:id');
router.delete('/deleteProject/:id');


export default router;