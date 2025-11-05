import { axiosInsttance } from "@/lib/axios";
import {create} from "zustand"


interface AuthStore {
    isAdmin : boolean;
    isLoading : boolean;
    error : string | null;

    checkAdminStatus : () => Promise<void>;
    reset : () => void;
}

export const useAuthStore = create<AuthStore>((set) =>  ({

    isAdmin : false,
    isLoading : false,
    error : null, 

    checkAdminStatus : async () => {
        set({isLoading: true, error : null });
        try{
            const response = await axiosInsttance.get("/admin/check");
            set({isAdmin: response.data.admin});

        }catch(error : any){
            set({isAdmin: false, error: error.response.data.message})
        }
    },

    reset : () => {
        set({isAdmin : false, isLoading :false, error : null});
    }
}))