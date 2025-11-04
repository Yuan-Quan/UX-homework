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
            <div className="w-full max-w-[1600px] flex flex-col lg:flex-row gap-8 px-4 lg:px-8">
                {/* Left column - Project Panel */}
                <div className="lg:w-[650px] lg:h-screen lg:overflow-hidden lg:flex-shrink-0 lg:py-8">
                    <div className="px-4 py-6 lg:px-0 lg:py-0">
                        <h1 className="text-4xl font-bold text-white mb-3 text-center lg:text-left">
                            欢迎来到绘想 AIGC 平台
                        </h1>
                        <p className="text-base text-white/80 mb-4 text-center lg:text-left">
                            开启您的创意AI之旅。探索、创建并分享令人惊艳的AI生成内容。
                        </p>
                    </div>
                    <ProjectPanel />
                </div>

                {/* Right column - VideoWall */}
                <div className="flex-1 lg:h-screen lg:py-8 mb-24 lg:mb-0 flex items-center justify-center">
                    <VideoWall />
                </div>
            </div>
        </div>
    );
};

export default Home;