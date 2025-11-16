import Router from 'express';
const router = Router();

router.get('/viewProfile', (req, res) => {
  res.send('API is working properly');
});
router.put('/editProfile', (req, res) => {
  res.send('API is working properly');
});




export default router;