import { useState, useEffect } from "react";
import ProjectPanel from "@/components/ProjectPanel";
import VideoWall from "@/components/VideoWall";
import { HomeSkeletonLoader } from "@/components/HomeSkeletonLoader";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time - remove this if you have actual async operations
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <HomeSkeletonLoader />;
    }
    return (
        <div className="min-h-screen overflow-hidden bg-background flex justify-center">
            <div className="w-full flex flex-col lg:flex-row">
                {/* Left column - visible on wider screens */}
                <div className="lg:w-[600px] lg:h-screen lg:overflow-y-auto lg:flex-shrink-0 no-scrollbar">
                    <div className="px-4 py-6 lg:py-8">
                        <h1 className="text-4xl font-bold text-white mb-3 text-center lg:text-left">
                            Welcome to 绘想 AIGC Platform
                        </h1>
                        <p className="text-base text-white/80 max-w-2xl mx-auto lg:mx-0 mb-4 text-center lg:text-left">
                            Your creative AI journey starts here. Explore, create, and share amazing AI-generated content.
                        </p>
                    </div>
                    <ProjectPanel />
                </div>

                {/* Right column - VideoWall */}
                <div className="flex-1 min-h-screen mb-24 lg:mb-0">
                    <VideoWall />
                </div>
            </div>
        </div>
    );
};

export default Home;