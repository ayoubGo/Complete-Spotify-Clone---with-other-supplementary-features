import { axiosInsttance } from '@/lib/axios';
import type { Album, Song } from '@/types';
import {create } from 'zustand';


interface MusicStore {
    songs: Song[];
    albums : Album[];
    isLoading: boolean;
    error : Album | null |any;
    currentAlbum : string | null,
    featuredSongs : Song[];
    madeForYouSongs : Song[];
    trendingSongs : Song[];

    
    
    fetchAlbums : () => Promise<void>; 
    fetchAlbumById : (id: string) => Promise<void>;
    featchFeaturedSongs : () => Promise<void>;
    fetchMadeForYouSongs : () => Promise<void>;
    fetchTrendingSongs : () => Promise<void>;

};

export const useMusicStore = create<MusicStore>((set) => ({
    albums : [],
    songs : [],
    isLoading :  false,
    error : null,
    currentAlbum : null,
    madeForYouSongs : [],
    featuredSongs : [],
    trendingSongs :[],



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

    featchFeaturedSongs : async () => {
        set({isLoading: true, error: null});
        try{
            const response =  await axiosInsttance.get("/songs/featured");
            set({featuredSongs :response.data});
        }catch(error : any){
            set({error : error.response.data.message});
        }finally{
            set({isLoading: false})
        }
    },
    
    fetchMadeForYouSongs :  async () => {
        set({isLoading: true, error: null});
        try{
            const response = await axiosInsttance.get("/songs/made_for_you");
            set({madeForYouSongs: response.data});
        }catch(error : any){
            set({error: error.response.data.message});
        }finally{
            set({isLoading: false});
        }
    },

    fetchTrendingSongs : async () => {
        set({isLoading: true, error: null});
        try{
            const response = await axiosInsttance.get("/songs/treanding");
            set({trendingSongs: response.data});
        }catch(error : any){
            set({error : error.response.data.message});
        }finally{
            set({isLoading: false});
        }
    },
}));    