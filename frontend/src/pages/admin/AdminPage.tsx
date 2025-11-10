import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./componemts/Header";
import DashboardStats from "./componemts/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import SongsTabContent from "./componemts/SongsTabContent";
import AlbumTabContent from "./componemts/AlbumTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";


const AdminPage = () => {
    const {isAdmin, isLoading} = useAuthStore();
    const {fetchSongs, fetchAlbums, fetchStats, songs, albums, stats} = useMusicStore();

    if(!isAdmin && !isLoading) return <div>Unauthorized</div>;

    useEffect(() => {
        fetchAlbums();
        fetchStats();
        fetchSongs();
    },[fetchAlbums, fetchSongs, fetchStats]);

    console.log(songs, albums, stats)

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black
         text-zinc-100 p-8">

            <Header/>
            <DashboardStats/>

            <Tabs defaultValue="songs" className="space-y-6">
                <TabsList className="p-1 bg-zinc-800/50">
                    <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-700">
                        <Music className="mr-2 size-4 "/>
                        Songs
                    </TabsTrigger>  
                    <TabsTrigger value="albums" className="data-[state=active]:bg-zinc-700">
                        <Album className="mr-2 size-4 "/>
                        Albums
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="songs">
                    <SongsTabContent/>
                </TabsContent>

                <TabsContent value="albums">
                    <AlbumTabContent/>
                </TabsContent>
            </Tabs>

        </div>
    )
};
export default AdminPage;