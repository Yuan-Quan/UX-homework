import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';

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
    className?: string;
}

const VideoTile = ({ src, className = "" }: VideoTileProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Get resolution from filename
    const resolution = src.split('.')[1];
    const [width, height] = resolution.split('_').map(Number);
    const aspectRatio = width / height;

    // Determine size class based on aspect ratio ranges
    let sizeClass = '';
    if (aspectRatio >= 1.3) {
        sizeClass = 'col-span-2 w-full h-[120px]'; // Horizontal
    } else if (aspectRatio <= 0.8) {
        sizeClass = 'row-span-2 w-full h-[243px]'; // Vertical (2 rows + 1 gap)
    } else {
        sizeClass = 'w-full h-[120px]'; // Square
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
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-200">
                    <Button
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-white border border-white/40"
                    >
                        Use This Template
                    </Button>
                </div>
            )}
        </div>
    );
};

const VideoWall = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollAnimationRef = useRef<number | undefined>(undefined);
    const lastTimeRef = useRef<number | undefined>(undefined);
    const scrollSpeedRef = useRef<number>(50); // pixels per second

    // Duplicate videos array for infinite scroll effect
    const allVideos = [...videos, ...videos, ...videos];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            // Reset scroll position when reaching bottom
            if (container.scrollTop > (container.scrollHeight * 0.66)) {
                container.scrollTop = container.scrollHeight * 0.33;
            }
            // Reset scroll position when reaching top
            if (container.scrollTop < (container.scrollHeight * 0.33)) {
                container.scrollTop = container.scrollHeight * 0.66;
            }
        };

        const animate = (timestamp: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = timestamp;
            const deltaTime = timestamp - lastTimeRef.current;
            lastTimeRef.current = timestamp;

            const container = containerRef.current;
            if (container) {
                // Calculate scroll increment based on time delta and speed
                const scrollIncrement = (scrollSpeedRef.current * deltaTime) / 1000;
                container.scrollTop += scrollIncrement;
            }

            scrollAnimationRef.current = requestAnimationFrame(animate);
        };

        // Start animation
        scrollAnimationRef.current = requestAnimationFrame(animate);

        container.addEventListener('scroll', handleScroll);
        container.scrollTop = container.scrollHeight * 0.33;

        // Cleanup
        return () => {
            if (scrollAnimationRef.current) {
                cancelAnimationFrame(scrollAnimationRef.current);
            }
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative w-full max-w-6xl mx-auto">
            {/* Top fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />

            {/* Video grid */}
            <div
                ref={containerRef}
                className="h-[calc(100vh-100px)] overflow-y-scroll grid grid-cols-3 auto-rows-[120px] gap-3 px-6 mx-auto no-scrollbar"
            >
                {allVideos.map((video, index) => (
                    <VideoTile key={`${video}-${index}`} src={video} />
                ))}
            </div>

            {/* Bottom fade with button */}
            <div className="absolute bottom-0 left-0 right-0 h-48 z-10 flex items-end justify-center pb-6 max-w-[900px] mx-auto">
                {/* Multiple gradient layers for enhanced contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
                <Button
                    variant="outline"
                    size="lg"
                    className="bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-500/90 hover:to-blue-500/90 text-white border-white/30 shadow-lg backdrop-blur-sm transition-all duration-300 font-semibold px-8 relative"
                >
                    Explore Community
                </Button>
            </div>
        </div>
    );
};

export default VideoWall;