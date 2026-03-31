import photoRepository from "../repositories/photoRepository.js";
class PhotoService{
    async getAllPhotos(){
        const photos = await photoRepository.findAll();
        return photos.map(photo => ({
            ...photo.toObject(),
            photoUrl: `/assets/upload/${photo.photo}`
        }));
    }
    async getPhotosAndPeople(){
        const photos = await photoRepository.findPhotosAndPeople();
         return photos.map(photo => ({
            ...photo.toObject(),
            photoUrl: `/assets/upload/${photo.photo}`
        }));
    }
}
export default new PhotoService();