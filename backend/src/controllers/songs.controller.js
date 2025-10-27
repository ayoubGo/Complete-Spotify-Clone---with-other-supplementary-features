import { Song } from "../models/song.model.js"

export const getAllSongs = async (req , res , next) => {
    try{
        // -1 = Descending => newest -> oldest
        // 1 = Ascending => oldest -> newest
        const songs = Song.find().sort({createdAt : -1});
        res.json(songs);
    }
    catch(error) {
        next(error);
    }
};

export const getFeaturedSongs = async (req, res, next) => {
    try{
        // fetch 6 random songs using mongodb's aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample: {size: 6},
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                },
            },
        ])
    }catch(error){
        next(error);
    }
};

export const getMadeForYouSongs = async (req, res, next) => {
    try{
        // fetch 4 random songs using mongodb's aggregation pipeline
        // normally these has to be a fansy algorithm but we will do it simple and just get random songs
        const songs = await Song.aggregate([
            {
                $sample: {size: 4},
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                },
            },
        ])
    }catch(error){
        next(error);
    }
};

export const getTreandingSongs = async (req, res, next) => {
    try{
        // fetch 4 random songs using mongodb's aggregation pipeline
        // normally these has to be a fansy algorithm but we will do it simple and just get random songs
        const songs = await Song.aggregate([
            {
                $sample: {size: 4},
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                },
            },
        ])
    }catch(error){
        next(error);
    }
}
