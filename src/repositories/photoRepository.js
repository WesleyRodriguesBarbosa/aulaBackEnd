import photo from '../models/Photo.js';
class photoRepository{
    async findAll(){
        return await photo.find();
    }

    async findPhotosAndPeople(){
        return await photo.find()
        .populate('people', 'name age')
        .sort({createdAt:-1})
    }
}
export default new photoRepository();