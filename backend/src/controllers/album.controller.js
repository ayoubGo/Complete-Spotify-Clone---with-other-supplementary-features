import { Album } from "../models/album.model.js"

export const getAllAlbums = async (req, res, next) => {
    try{
        const albums = await Album.find(); // when you leave find emty without anything it will fetch everything
        res.status(200).json(albums);

    }catch(error){
        next(error);
    }
}

export const getAlbumById = async (req, res, next) => {
    try{
        const {albumId} = req.params;
        const album = await Album.findById(albumId).populate("songs"); // to get all the sings in the album we use populate

        if(!album){
            return res.status(404).json({message : "Album not found"});
        };

        res.status(200).json(album);
    }catch(error){

        next(error);
    }
}