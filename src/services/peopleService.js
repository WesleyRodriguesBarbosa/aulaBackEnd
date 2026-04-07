import peopleRepository from "../repositories/peopleRepository.js";
class PeopleService {

    async createPeople(people) {
        if (!people.name || !people.age || !people.email) {
            throw new Error("Todos os campos são obrigatórios");
        }
        return await peopleRepository.create(people);
    }

    async getAll() {
        return await peopleRepository.getAll();
    }

    async getById(id) {
        return await peopleRepository.getById(id);
    }

    async updatePeople(id, data) {
        return await peopleRepository.update(id, data);
    }

    async deletePeople(id) {
        return await peopleRepository.delete(id);
    }
}

export default new PeopleService();