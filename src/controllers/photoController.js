import photoService from "../services/photoService.js";
class PhotoController{

    async create(req,res){
        app.post('/photo/create',
    upload.single('photo'),  // Processa upload
    async (req, res) => {
        try {
            const { peopleId } = req.body;
            const file = req.file;
            // Validação: arquivo enviado?
            if (!file) {
                return res.status(400).json({
                    message: "Arquivo obrigatório"
                });
            }
            // Validação: peopleId fornecido?
            if (!peopleId) {
                await fs.unlink(file.path);  // Limpar arquivo
                return res.status(400).json({
                    message: "ID da pessoa obrigatório"
                });
            }
            // Criar documento
            const ph = new photo({
                people: peopleId,
                photo: file.filename
            });
            await ph.save();
            await ph.populate('people', 'name age');
            res.status(201).json(ph);

        } catch (error) {
            // Limpar arquivo se erro
            if (req.file) {
                await fs.unlink(req.file.path);
            }
            res.status(500).json({
                message: "Erro ao criar foto",
                error: error.message
            });
        }
    }
);
    }

    async index(req, res){
        try{
             const photos = await photoService.getAllPhotos();
             res.status(200).json(photos);
        }catch(error){
            res.status(500).json({
                message: "Erro ao listar as fotos.", 
                error: error.mensage
            });
        }
    }
    async photoPeople(req, res){
          try{
             const photos = await photoService.getPhotosAndPeople();
             res.status(200).json(photos);
        }catch(error){
            res.status(500).json({
                message: "Erro ao listar as fotos.", 
                error: error.mensage
            });
        }
    }
}

export default new PhotoController();