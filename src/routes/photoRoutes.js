import express from "express";
import photoController from "../controllers/photoController.js";
import peopleController from "../controllers/peopleController.js";
import upload from "../config/multer.js";
const router = express.Router();
router.post('/photo/create', upload.single('photo'));
router.get('/photos', photoController.index);
router.get('/photo/people', peopleController.photosPeople);
export default router;