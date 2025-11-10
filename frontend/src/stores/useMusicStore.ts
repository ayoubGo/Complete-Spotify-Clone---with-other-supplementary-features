import { axiosInsttance } from '@/lib/axios';
import type { Album, Song, Stats } from '@/types';
import toast from 'react-hot-toast';
import {create } from 'zustand';


interface MusicStore {
    songs: Song[];
    albums : Album[];
    isLoading: boolean;
    error : null |any;
    currentAlbum : string | null,
    featuredSongs : Song[];
    madeForYouSongs : Song[];
    trendingSongs : Song[];
    stats: Stats;

    
    
    fetchAlbums : () => Promise<void>; 
    fetchAlbumById : (id: string) => Promise<void>;
    featchFeaturedSongs : () => Promise<void>;
    fetchMadeForYouSongs : () => Promise<void>;
    fetchTrendingSongs : () => Promise<void>;
    fetchSongs: () => Promise<void>;
    fetchStats :() => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    deleteAlbum : (id: string) => Promise<void>;

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
    stats:{
        totalAlbums: 0,
        totalArtists:0,
        totalSongs: 0,
        totalUsers:0
    },


    deleteAlbum: async (id) => {
        set({isLoading: true, error: null});
        try{
            await axiosInsttance.delete(`/admin/album/${id}`);


        }catch(error: any){

        }finally{

        }
    },  

    deleteSong: async (id) => {
        set({isLoading: true, error: null});
        try{
            await axiosInsttance.delete(`/admin/song/${id}`);
            set(state => ({
                songs : state.songs.filter(song => song._id !== id)
            }));

            toast.success("Song deleted successfully");
        }catch(error : any){
            set({error: error.message});
            toast.error("Error deleting song");

        }finally{
            set({isLoading: false});
        }
    },

    fetchSongs: async () => {
        set({isLoading: true, error: null});
        try{
            const response = await axiosInsttance.get("/songs");
            set({songs: response.data});
        }catch(error: any){
            set({error: error.data.response.message});
        }finally{
            set({isLoading: false})
        }
    },

    fetchStats:async () => {
        set({isLoading: true, error: null});
        try{
            const response = await axiosInsttance.get("/stats");
            set({stats: response.data});
        }catch(error : any){
            set({error: error.response.data.message});
        }
        finally{
            set({isLoading: false})
        }
    },

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