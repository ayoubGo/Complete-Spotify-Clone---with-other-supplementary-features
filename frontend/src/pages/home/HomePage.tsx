import TopBar from "@/components/TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area"; // ✅ correct import
import SectionGrid from "./components/SectionGride";

const HomePage = () => {
  const {
    featchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    trendingSongs,
  } = useMusicStore();

  useEffect(() => {
    fetchMadeForYouSongs();
    featchFeaturedSongs();
    fetchTrendingSongs();
  }, [featchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

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
