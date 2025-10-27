import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req , res ,next) => {
     try{
            // const totalSongs = await Song.countDocuments();
            // const tolatUsers = await User.countDocuments();
            // const totalAlbums = await Album.countDocuments();
    
            const [totalSongs, tolatUsers, totalAlbums, uniqueArtists] = await Promise.all([
                Song.countDocuments(),
                User.countDocuments(),
                Album.countDocuments(),
    
                // this syntax is spesific to aggregate pipeline
                Song.aggregate([
                    {
                        $unionWith: {
                            coll: "album",
                            pipeline : [],
                        },
                    },
                    {
                        $group : {
                            _id: "$artist",
                        },
                    },
                    {
                        $count: "count",
                    }
                ]),
            ]);
    
            res.status(200).json({
                totalAlbums,
                totalSongs,
                tolatUsers,
                totalArtists:  uniqueArtists[0]?.count || 0,
            })
        }catch(error){
            next(error);
        }
}