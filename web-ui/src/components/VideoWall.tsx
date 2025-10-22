import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { VideoWallSkeletonLoader } from './VideoWallSkeletonLoader';

const videos = [
    'anime_girl_sunset.1280_720.mp4',
    'blue_skirt_neo.704_1280.mp4',
    'cat_anime.720_720.mp4',
    'cat_squish.1094_720.mp4',
    'cyber_city.704_1280.mp4',
    'dream_whale.720_1094.mp4',
    'electric_tiger.720_1280.mp4',
    'emo_girl.1280_720.mp4',
    'flight.1280_720.mp4',
    'icecream_castel.720_720.mp4',
    'majon.1280_720.mp4',
    'mountain_cart.720_720.mp4',
    'pirimad.1280_704.mp4',
    'snow_mountain.1280_704.mp4',
    'surfing.704_1280.mp4',
    'trans_beach.1280_720.mp4',
    'water_dog.720_720.mp4',
    'water_flower.704_1280.mp4'
];

interface VideoTileProps {
    src: string;
    index: number;
    className?: string;
    onNavigate?: (path: string) => void;
}

const VideoTile = ({ src, index, className = "", onNavigate }: VideoTileProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Get resolution from filename
    const resolution = src.split('.')[1];
    const [width, height] = resolution.split('_').map(Number);

    // Create varied pattern - break up repetition every 8 items with different layouts
    const positionInPattern = index % 12;
    let sizeClass = '';

    // More varied sizing pattern to break up repetition
    if (positionInPattern === 0) {
        sizeClass = 'col-span-2 row-span-2 w-full h-[243px]'; // Large square
    } else if (positionInPattern === 1 || positionInPattern === 2) {
        sizeClass = 'w-full h-[120px]'; // Regular
    } else if (positionInPattern === 3) {
        sizeClass = 'col-span-2 w-full h-[120px]'; // Wide
    } else if (positionInPattern === 4) {
        sizeClass = 'row-span-2 w-full h-[243px]'; // Tall
    } else if (positionInPattern === 5 || positionInPattern === 6) {
        sizeClass = 'w-full h-[120px]'; // Regular
    } else if (positionInPattern === 7) {
        sizeClass = 'col-span-2 w-full h-[120px]'; // Wide
    } else if (positionInPattern === 8) {
        sizeClass = 'w-full h-[120px]'; // Regular
    } else if (positionInPattern === 9) {
        sizeClass = 'row-span-2 w-full h-[243px]'; // Tall
    } else if (positionInPattern === 10) {
        sizeClass = 'col-span-2 w-full h-[120px]'; // Wide
    } else {
        sizeClass = 'w-full h-[120px]'; // Regular
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, []);

    return (
        <div
            className={`relative rounded-xl overflow-hidden group ${sizeClass} ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ aspectRatio: `${width}/${height}` }}
        >
            <video
                ref={videoRef}
                src={`/CommunityVideo/${src}`}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
            />
            {isHovered && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 transition-opacity duration-200">
                    <Button
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-white border border-white/40"
                        onClick={() => onNavigate?.("/community/1")}
                    >
                        使用此模板
                    </Button>
                    <Button
                        variant="secondary"
                        className="bg-purple-500/30 hover:bg-purple-500/50 text-white border border-purple-400/40"
                        onClick={() => onNavigate?.("/workbench/demo-project/footage")}
                    >
                        调整
                    </Button>
                </div>
            )}
        </div>
    );
};

const VideoWall = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollAnimationRef = useRef<number | undefined>(undefined);
    const lastTimeRef = useRef<number | undefined>(undefined);
    const scrollSpeedRef = useRef<number>(50); // pixels per second
    const [isLoading, setIsLoading] = useState(true);

    // Duplicate videos array for infinite scroll effect
    const allVideos = [...videos, ...videos, ...videos];

    useEffect(() => {
        // Simulate loading time for video resources
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || isLoading) return;

        // Give DOM time to render and calculate proper dimensions
        const setupTimer = setTimeout(() => {
            // Reset timing ref for new animation cycle
            lastTimeRef.current = undefined;

            const animate = (timestamp: number) => {
                const container = containerRef.current;
                if (!container) {
                    return;
                }

                if (!lastTimeRef.current) {
                    lastTimeRef.current = timestamp;
                }

                const deltaTime = (timestamp - lastTimeRef.current) / 1000; // Convert to seconds
                lastTimeRef.current = timestamp;

                // Calculate scroll increment: 50 pixels per second
                const scrollIncrement = scrollSpeedRef.current * deltaTime;
                container.scrollTop += scrollIncrement;

                // Get the scrollable height
                const scrollableHeight = container.scrollHeight - container.clientHeight;

                // Loop back to top when reaching 66% of scrollable height
                if (container.scrollTop >= scrollableHeight * 0.66) {
                    container.scrollTop = scrollableHeight * 0.33;
                    lastTimeRef.current = timestamp; // Reset to avoid large deltaTime on next frame
                }

                scrollAnimationRef.current = requestAnimationFrame(animate);
            };

            // Initialize scroll position to middle of scrollable area
            const scrollableHeight = container.scrollHeight - container.clientHeight;
            container.scrollTop = scrollableHeight * 0.33;

            // Start animation
            scrollAnimationRef.current = requestAnimationFrame(animate);
        }, 100);

        return () => {
            clearTimeout(setupTimer);
            if (scrollAnimationRef.current) {
                cancelAnimationFrame(scrollAnimationRef.current);
            }
        };
    }, [isLoading]);

    if (isLoading) {
        return <VideoWallSkeletonLoader />;
    }

    return (
        <div className="relative w-full rounded-b-2xl overflow-hidden">
            {/* Top fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />

            {/* Video grid */}
            <div
                ref={containerRef}
                className="h-[calc(100vh-100px)] overflow-y-scroll grid grid-cols-3 auto-rows-[120px] gap-3 px-6 no-scrollbar"
            >
                {allVideos.map((video, index) => (
                    <VideoTile key={`${video}-${index}`} src={video} index={index} onNavigate={navigate} />
                ))}
            </div>

            {/* Bottom fade with button */}
            <div className="absolute bottom-0 left-0 right-0 h-48 z-10 flex items-end justify-center pb-6">
                {/* Multiple gradient layers for enhanced contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <Button
                    variant="outline"
                    size="lg"
                    className="bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-500/90 hover:to-blue-500/90 text-white border-white/30 shadow-lg backdrop-blur-sm transition-all duration-300 font-semibold px-8 relative z-20"
                    onClick={() => navigate("/community")}
                >
                    探索社区
                </Button>
            </div>
        </div>
    );
};

export default VideoWall;