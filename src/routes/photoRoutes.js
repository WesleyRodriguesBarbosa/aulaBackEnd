import express from 'express';
import upload from '../config/multer.js';
import photoController from '../controllers/photoController.js';

const router = express.Router();

router.post('/photo', upload.single('photo'), photoController.create);
router.get('/photo', photoController.index);
router.get('/photo/people', photoController.photosPeople);
router.put('/photo/:id', upload.single('photo'), photoController.update);
router.delete('/photo/:id', photoController.delete);

export default router;