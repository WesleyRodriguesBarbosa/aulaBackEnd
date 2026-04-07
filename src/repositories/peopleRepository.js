import People from "../models/People.js";

class PeopleRepository {

    async create(peopleData) {
        return await People.create(peopleData);
    }

    async getAll() {
        return await People.find();
    }

    async getById(id) {
        return await People.findById(id);
    }

    async update(id, peopleData) {
        return await People.findByIdAndUpdate(
            id,
            peopleData,
            { 
                new: true,
                runValidators: true // 🔥 importante
            }
        );
    }

    async delete(id) {
        return await People.findByIdAndDelete(id);
    }
}

export default new PeopleRepository();