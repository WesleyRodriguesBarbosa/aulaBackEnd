import Photo from '../models/Photo.js';

class PhotoRepository {

    // GET ALL
    async findAll() {
        return await Photo.find();
    }

    // GET ALL + PEOPLE (JOIN)
    async findPhotosAndPeople() {
        return await Photo.find()
            .populate('people', 'name age')
            .sort({ createdAt: -1 });
    }

    // GET BY ID
    async findById(id) {
        return await Photo.findById(id)
            .populate('people', 'name age'); // 🔥 útil aqui também
    }

    // CREATE
    async create(photoData) {
        return await Photo.create(photoData);
    }

    // UPDATE
    async update(id, photoData) {
        return await Photo.findByIdAndUpdate(
            id,
            photoData,
            {
                new: true,
                runValidators: true // 🔥 importante
            }
        ).populate('people', 'name age');
    }

    // DELETE
    async delete(id) {
        return await Photo.findByIdAndDelete(id);
    }
}

export default new PhotoRepository();