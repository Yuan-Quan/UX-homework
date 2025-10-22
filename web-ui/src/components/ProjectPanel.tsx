import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const projectData = [
    {
        title: "新项目",
        description: "重新开始",
        type: "new"
    },
    {
        title: "Demo_Project Icecream Castel",
        description: "云上的冰淇淋城堡",
        date: "2025-10-16"
    },
    {
        title: "2025-10-15 未命名",
        description: "项目描述",
        date: "2025-10-15"
    },
    {
        title: "2025-10-12 测试项目",
        description: "测试新的长视频生成功能",
        date: "2025-10-12"
    },
    {
        title: "2025-10-01 未命名",
        description: "项目描述",
        date: "2025-10-01"
    }
];

const ProjectCard = ({ project, onProjectClick }: { project: (typeof projectData)[0], onProjectClick?: () => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isHovered) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isHovered]);

    const handleClick = () => {
        if (project.type !== "new" && onProjectClick) {
            onProjectClick();
        }
    };

    return (
        <div
            className={`p-3 rounded-lg ${project.type === "new"
                ? "bg-white/10 border-2 border-dashed border-white/20 hover:border-white/30"
                : "bg-white/5 border border-white/10"
                } backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <div className="flex gap-3">
                {project.type === "new" ? (
                    <>
                        <div className="flex-none w-20 h-20 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                            <PlusCircle className="h-7 w-7 text-white/70" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                            <p className="text-sm text-white/70">{project.description}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex-none w-20 h-20 rounded-md overflow-hidden bg-white/5 border border-white/10">
                            <video
                                ref={videoRef}
                                src={`/ProjectPreview/${project.title}.mp4`}
                                className="w-full h-full object-cover"
                                loop
                                muted
                                playsInline
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-white mb-1 truncate">{project.title}</h3>
                            <p className="text-sm text-white/70 mb-2">{project.description}</p>
                            <div className="flex justify-end items-center text-xs text-white/50">
                                <span>{project.date}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const ProjectPanel = () => {
    const navigate = useNavigate();

    const handleProjectClick = () => {
        navigate(`/workbench/demo-project`);
    };

    return (
        <div className="flex flex-col px-4 lg:px-6">
            <div className="flex-none">
                <div className="sticky top-0 bg-background/80 backdrop-blur-sm pb-2">
                    <h2 className="text-lg font-semibold text-white mb-3 text-center lg:text-left">
                        我的项目
                    </h2>

                    {/* Search Bar */}
                    <div className="relative mb-3">
                        <Search className="absolute left-3 top-2 h-4 w-4 text-white/50" />
                        <Input
                            placeholder="搜索项目..."
                            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/50 h-8 text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Project List */}
            <div className="h-[calc(100vh-380px)] rounded-md border border-white/10 bg-white/5 p-3">
                <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                        {projectData.map((project, index) => (
                            <ProjectCard key={index} project={project} onProjectClick={handleProjectClick} />
                        ))}
                    </div>
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </div>
        </div>
    );
};

export default ProjectPanel;