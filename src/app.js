import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import path from "path";

import peopleRoutes from './routes/peopleRoutes.js';
import photoRoutes from './routes/photoRoutes.js';

const app = express();

app.use(express.json());
app.use('/uploads', express.static('assets/uploads'));

await conectaNaDatabase();

app.use('/api', peopleRoutes);
app.use('/api', photoRoutes);

export default app;