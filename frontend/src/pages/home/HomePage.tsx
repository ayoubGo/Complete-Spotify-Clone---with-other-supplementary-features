import TopBar from "@/components/TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import SectionGrid from "./components/SectionGride";

const HomePage = () =>{
    const {
        featchFeaturedSongs,
        fetchMadeForYouSongs,
        fetchTrendingSongs,
        isLoading,
        featuredSongs,
        madeForYouSongs, 
        trendingSongs
    } = useMusicStore();

    useEffect(() => {
        fetchMadeForYouSongs();
        featchFeaturedSongs();
        fetchTrendingSongs();
    },[featchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

    console.log(isLoading, featuredSongs, madeForYouSongs, trendingSongs);
    return (
        <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
            <TopBar/>
            <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-4 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good afternoon</h1>
                    <FeaturedSection/>

                  <div className="space-y-8">
                       <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading}/>
                       <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading}/>

                   </div>
                </div>
            </ScrollArea>

        </div>
    )
};
export default HomePage;

