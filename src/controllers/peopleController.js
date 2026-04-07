import People from "../models/People.js";
import peopleService from "../services/peopleService.js";
import mongoose from "mongoose";

class PeopleController {

    async create(req, res) {
        try {
            const people = await peopleService.createPeople(req.body);

            res.status(201).json({
                message: "Pessoa criada com sucesso",
                data: people
            });

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    /**Impmente os outros métodos a partir da qui */

    async index(req, res) {
        try {
            const peoples = await peopleService.getAll();
            res.status(200).json(peoples);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

     async getById(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const pessoa = await People.findById(id);

            if (!pessoa) {
                return res.status(404).json({ message: "Pessoa não encontrada" });
            }

            return res.json(pessoa);

        } catch (erro) {
                  return res.status(500).json({ message: "Erro no servidor" });
}
    }

     /* UPDATE */
    async update(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const updated = await peopleService.updatePeople(id, req.body);

            if (!updated) {
                return res.status(404).json({
                    message: "Pessoa não encontrada"
                });
            }

            res.status(200).json({
                message: "Pessoa atualizada com sucesso",
                data: updated
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    /*DELETE */
    async delete(req, res) {
        try {
            const { id } = req.params;

            
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const deleted = await peopleService.deletePeople(id);

            if (!deleted) {
                return res.status(404).json({
                    message: "Pessoa não encontrada"
                });
            }

            res.status(200).json({
                message: "Pessoa deletada com sucesso"
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new PeopleController();