import ProjectPanel from "@/components/ProjectPanel";
import VideoWall from "@/components/VideoWall";

const Home = () => {
    return (
        <div className="min-h-screen overflow-hidden bg-background relative flex justify-center">
            {/* Left column - visible on wider screens */}
            <div className="lg:fixed lg:left-0 lg:w-[600px] lg:h-screen lg:overflow-y-auto no-scrollbar">
                <div className="px-4 py-6 lg:py-8">
                    <h1 className="text-4xl font-bold text-white mb-3 text-center lg:text-left">
                        Welcome to 绘想 AIGC Platform
                    </h1>
                    <p className="text-base text-white/80 max-w-2xl mx-auto mb-4 text-center lg:text-left lg:mx-0">
                        Your creative AI journey starts here. Explore, create, and share amazing AI-generated content.
                    </p>
                </div>
                <ProjectPanel />
            </div>

            {/* Right column - VideoWall */}
            <div className="lg:ml-[600px] lg:mr-0 ">
                <div className="mb-24 lg:mb-0 lg:min-h-screen">
                    <VideoWall />
                </div>
            </div>
        </div>
    );
};

export default Home;