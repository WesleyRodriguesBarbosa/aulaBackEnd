import photoRepository from '../repositories/photoRepository.js';
import peopleRepository from '../repositories/peopleRepository.js';
import fs from "fs/promises";
import path from "path";

class PhotoService {

    async getAllPhotos() {
        const photos = await photoRepository.findAll();

        return photos.map(photo => ({
            ...photo.toObject(),
            photoUrl: `/uploads/${photo.photo}`
        }));
    }

    async getPhotosAndPeople() {
        const photos = await photoRepository.findPhotosAndPeople();

        return photos.map(photo => ({
            ...photo.toObject(),
            photoUrl: `/uploads/${photo.photo}`
        }));
    }

    async getById(id) {
        const photo = await photoRepository.findById(id);

        if (!photo) return null;

        return {
            ...photo.toObject(),
            photoUrl: `/uploads/${photo.photo}`
        };
    }

    async createPhoto(peopleId, file) {
        if (!file) {
            throw new Error("Arquivo obrigatório");
        }

        const personExists = await this.checkPersonExists(peopleId);

        if (!personExists) {
            throw new Error("Pessoa não encontrada");
        }

        const photoData = {
            people: peopleId,
            photo: file.filename
        };

        return await photoRepository.create(photoData);
    }

    async updatePhoto(id, peopleId, file) {

        const currentPhoto = await photoRepository.findById(id);

        if (!currentPhoto) return null;

        let updateData = {};

        if (file) {
            const oldPath = path.join('assets/uploads', currentPhoto.photo);

            try {
                await fs.unlink(oldPath);
            } catch (err) {
                console.warn("Arquivo antigo não encontrado");
            }

            updateData.photo = file.filename;
        }

        if (peopleId) {
            const personExists = await this.checkPersonExists(peopleId);

            if (!personExists) {
                throw new Error("Pessoa não encontrada");
            }

            updateData.people = peopleId;
        }

        return await photoRepository.update(id, updateData);
    }

    async deletePhoto(id) {
        const photo = await photoRepository.findById(id);

        if (!photo) return null;

        const filePath = path.join('assets/uploads', photo.photo);

        try {
            await fs.unlink(filePath);
        } catch (err) {
            console.warn("Arquivo não encontrado");
        }
        return await photoRepository.delete(id);
    }

    async checkPersonExists(personId) {
        const person = await peopleRepository.getById(personId);
        return !!person;
    }
}

export default new PhotoService();