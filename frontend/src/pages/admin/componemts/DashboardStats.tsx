import { useMusicStore } from "@/stores/useMusicStore";
import StatsCard from "./statsCard.tsx";
import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";


const DashboardStats = () => {
    
    const {stats} = useMusicStore();
    if(!stats) return;
    const statsData = [
        {
            icon :ListMusic,
            label : "Total Songs",
            value : stats.totalSongs.toString(),
            bgColor :"bg-emerald-500/10",
            iconColor: "text-emerald-500",
        },
        {
            icon :Library,
            label : "Total Album",
            value : stats.totalAlbums.toString(),
            bgColor :"bg-violet-500/10",
            iconColor: "text-violet-500",
        },
        {
            icon :Users2,
            label : "Total Artists",
            value : stats.totalArtists.toString(),
            bgColor :"bg-orange-500/10",
            iconColor: "bg-orange-500/10",
        },
        {
            icon :PlayCircle,
            label : "Total Users",
            value : stats.totalUsers.toString(),
            bgColor :"bg-sky-500/10",
            iconColor: "bg-sky-500/10",
        }
        
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat) => (
                <StatsCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                bgColor={stat.bgColor}
                iconColor={stat.iconColor}
                /> 
            ))}
        </div>
    )
};
export default DashboardStats;