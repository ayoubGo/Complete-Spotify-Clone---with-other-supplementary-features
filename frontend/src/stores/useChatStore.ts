import { axiosInsttance } from "@/lib/axios";
import { create } from "zustand";

interface chatStore {
    users : any[];
    fetchUsers : () => Promise <void>;
    isLoading : boolean;
    error : string | null;
}

export const useChatStore = create<chatStore>((set) => ({
    users : [],
    isLoading : false,
    error : null,

    fetchUsers : async () => {
        set({isLoading: true, error: null})
        try{
            const response = await axiosInsttance.get("/users");
            set({users: response.data});
        }catch(error : any){
            set({error : error.response.data.message});
        }finally{
            set({isLoading: false});
        }
    },

}));