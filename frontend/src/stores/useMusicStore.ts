import { axiosInsttance } from '@/lib/axios';
import type { Album, Song } from '@/types';
import {create } from 'zustand';


interface MusicStore {
    songs: Song[];
    albums : Album[];
    isLoading: boolean;
    error : Album | null;
    currentAlbum : string | null,

    fetchAlbums : () => Promise<void>; 
    fetchAlbumById : (id: string) => Promise<void>;
};

export const useMusicStore = create<MusicStore>((set) => ({
    albums : [],
    songs : [],
    isLoading :  false,
    error : null,
    currentAlbum : null,

    fetchAlbums : async () => {
        set({isLoading : true, error: null});

        try{
            const response = await axiosInsttance.get("/albums");
            set({albums : response.data});

        }catch(error : any){
            set({error : error.response.data.message})
        }finally{
            set({isLoading: false});
        }
    },

    fetchAlbumById :  async (id : string) => {
        try{
            set({isLoading : true});

            const response = await axiosInsttance.get(`/albums/${id}`);
            set({currentAlbum: response.data});
        }catch(error: any){
            set({error : error.response.data.message});
        }
        finally{
            set({isLoading : false});
        }
        
    },
}));