import TopBar from "@/components/TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area"; 
import SectionGrid from "./components/SectionGride";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {
  const {
    featchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchMadeForYouSongs();
    featchFeaturedSongs();
    fetchTrendingSongs();
  }, [featchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if( madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0){
      const allSongs = [...featuredSongs, ...madeForYouSongs,...trendingSongs]; 
      initializeQueue(allSongs);
    }
  },[initializeQueue, madeForYouSongs, featchFeaturedSongs, trendingSongs])

  return (
    <div className="h-screen bg-gradient-to-b from-zinc-800 to-zinc-900">
      <TopBar />
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good afternoon</h1>
          <FeaturedSection />
          <div className="space-y-8">
            <SectionGrid
              title="Made For You"
              songs={madeForYouSongs}
              isLoading={isLoading}
            />
            <SectionGrid
              title="Trending"
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
