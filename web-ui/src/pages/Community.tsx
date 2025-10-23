import { useEffect, useState, useRef } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

interface Section {
    id: string;
    title: string;
}

const sections: Section[] = [
    { id: "featured", title: "今日精选" },
    { id: "recommended", title: "你的推荐" },
    { id: "anime", title: "动漫" },
    { id: "pets", title: "宠物" },
    { id: "asmr", title: "ASMR" },
];

const getRandomVideos = (count: number) => {
    return Array.from({ length: count }).map(() => videos[Math.floor(Math.random() * videos.length)]);
};

interface VideoCard {
    id: string;
    src: string;
}

const VideoCard = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);

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

    return (
        <div
            className="relative w-48 h-48 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
                    <Button
                        className="bg-white/20 hover:bg-white/30 text-white border border-white/40"
                        size="sm"
                    >
                        查看
                    </Button>
                </div>
            )}
        </div>
    );
};

const SectionCarousel = ({ section }: { section: Section }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [cards, setCards] = useState<VideoCard[]>([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        // Generate 12 random video cards for each section
        const randomVideos = getRandomVideos(12);
        setCards(randomVideos.map((src, idx) => ({ id: `${section.id}-${idx}`, src })));
    }, [section.id]);

    const scroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollAmount = 400; // Scroll by 2 cards + gap
        if (direction === "left") {
            container.scrollLeft -= scrollAmount;
        } else {
            container.scrollLeft += scrollAmount;
        }

        checkScrollButtons();
    };

    const checkScrollButtons = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.addEventListener("scroll", checkScrollButtons);
        setTimeout(checkScrollButtons, 100);

        return () => container.removeEventListener("scroll", checkScrollButtons);
    }, []);

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
            <div className="relative group">
                {/* Left Arrow */}
                {canScrollLeft && (
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gray-800/50 px-3 py-4 transition-all shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 -ml-6 rounded-lg"
                    >
                        <ChevronLeft className="h-40 w-8 text-white " />
                    </button>
                )}

                {/* Right Arrow */}
                {canScrollRight && (
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gray-800/50 px-3 py-4 transition-all shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 -mr-6 rounded-lg"
                    >
                        <ChevronRight className="h-40 w-8 text-white" />
                    </button>
                )}

                {/* Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-4"
                >
                    {cards.map((card) => (
                        <VideoCard key={card.id} src={card.src} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Community = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="flex h-full w-full flex-col gap-0">
            <div
                className={`sticky top-0 z-30 px-6 py-3 backdrop-blur-sm transition-all duration-200 ${isScrolled
                    ? "bg-background/85 shadow-lg"
                    : "bg-gradient-to-b from-background via-background/95 to-background/0"
                    }`}
            >
                <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold tracking-tight text-white">
                            社区
                        </h1>
                        <p className="max-w-2xl text-xs text-white/60">
                            发现最新的社区作品和创作者
                        </p>
                    </div>

                    <div className="relative w-full lg:w-72 lg:shrink-0">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <Input
                            type="search"
                            placeholder="搜索作品、创作者..."
                            className="border-white/15 bg-white/10 pl-9 text-sm text-white placeholder:text-white/50 focus-visible:ring-white/30 hover:bg-white/15"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto">
                {sections.map((section) => (
                    <SectionCarousel key={section.id} section={section} />
                ))}
            </div>
        </section>
    );
};

export default Community;