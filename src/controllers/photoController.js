import photoService from '../services/photoService.js';
import mongoose from "mongoose";
import fs from "fs/promises";
class PhotoController {

    async create(req, res) {
        try {
            const { people } = req.body; //Aqui obtem o id da pessoa a qual a foto pertence (referência)
            const file = req.file;
            //Chama o método de criação da foto implementado no Service
            const photo = await photoService.createPhoto(people, file);

            res.status(201).json(photo);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async index(req, res) {
        try {
            const photos = await photoService.getAllPhotos();

            res.status(200).json(photos);

        } catch (error) {
            res.status(500).json({
                message: "Erro ao listar as fotos.",
                error: error.message
            });
        }
    }

    async photosPeople(req, res) {
        try {
            const photos = await photoService.getPhotosAndPeople();

            res.status(200).json(photos);

        } catch (error) {
            res.status(500).json({
                message: "Erro ao listar as fotos.",
                error: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { people } = req.body;
            const file = req.file;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                if (file) await fs.unlink(file.path);
                return res.status(400).json({ message: "ID inválido" });
            }

            const updatedPhoto = await photoService.updatePhoto(id, people, file);

            if (!updatedPhoto) {
                if (file) await fs.unlink(file.path);
                return res.status(404).json({
                    message: "Foto não encontrada."
                });
            }

            res.status(200).json({
                message: "Foto atualizada com sucesso.",
                data: updatedPhoto
            });

        } catch (error) {
            if (req.file) await fs.unlink(req.file.path);

            res.status(500).json({
                message: "Erro ao atualizar a foto.",
                error: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const deleted = await photoService.deletePhoto(id);

            if (!deleted) {
                return res.status(404).json({
                    message: "Foto não encontrada."
                });
            }

            res.status(200).json({
                message: "Foto removida com sucesso."
            });

        } catch (error) {
            res.status(500).json({
                message: "Erro ao remover a foto.",
                error: error.message
            });
        }
    }
}

export default new PhotoController();