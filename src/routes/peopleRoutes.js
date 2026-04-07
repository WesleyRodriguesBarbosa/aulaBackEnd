import express from 'express';
import peopleController from '../controllers/peopleController.js';

const router = express.Router();

router.post('/people', peopleController.create);
router.get("/people/:id", peopleController.getById);
router.get('/people', peopleController.index);
router.put('/people/:id', peopleController.update);
router.delete('/people/:id', peopleController.delete);

export default router;