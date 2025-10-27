import { Card, CardContent } from "@/components/ui/card";
import { axiosInsttance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";


const AuthCallBackPage = () => {


    const {isLoaded, user } = useUser();
    const navigate = useNavigate();
    const syncAttemted = useRef(false);

    useEffect(() => {
        const syncUser = async () => {
            try{    
                if(!isLoaded || !user || syncAttemted.current) return;
                await axiosInsttance.post("api/auth/callback", {
                    id:user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    imageUrl : user.imageUrl
                })

                syncAttemted.current = true;
            }catch(error){
                console.log("Error in auth callback", error);
            }
            finally{
                navigate("/some/route");
            }
            
        };

        syncUser();
    }, [isLoaded, user, navigate])
    return(
        <div className="h-screen  w-full bg-black flex items-center justify-center"> 
            <Card className=" w-[90%] max-w-md bg-zinc-900 border-zinc-800 ">
                <CardContent className="flex flex-col items-center gap-4 pt-6">
                    <Loader className="size-6 text-emerald-500 animate-spin"/>
                    <h3 className="text-zinc-400 text-xl font-bold">Loggin you in </h3>
                    <p  className="text-zinc-400 text-sm"> Redirecting... </p>
                </CardContent>
            </Card>
        </div>
    )
};
export default AuthCallBackPage;