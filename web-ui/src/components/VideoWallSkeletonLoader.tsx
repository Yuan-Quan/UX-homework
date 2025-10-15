import { Skeleton } from "@/components/ui/skeleton";

export const VideoWallSkeletonLoader = () => {
    // Generate varied skeleton pattern similar to VideoWall layout
    const skeletonPattern = [
        { colSpan: 2, rowSpan: 2, height: 243 }, // Large square
        { colSpan: 1, rowSpan: 1, height: 120 }, // Regular
        { colSpan: 1, rowSpan: 1, height: 120 }, // Regular
        { colSpan: 2, rowSpan: 1, height: 120 }, // Wide
        { colSpan: 1, rowSpan: 2, height: 243 }, // Tall
        { colSpan: 1, rowSpan: 1, height: 120 }, // Regular
        { colSpan: 1, rowSpan: 1, height: 120 }, // Regular
        { colSpan: 2, rowSpan: 1, height: 120 }, // Wide
        { colSpan: 1, rowSpan: 1, height: 120 }, // Regular
        { colSpan: 1, rowSpan: 2, height: 243 }, // Tall
        { colSpan: 2, rowSpan: 1, height: 120 }, // Wide
        { colSpan: 1, rowSpan: 1, height: 120 }, // Regular
    ];

    return (
        <div className="relative w-full rounded-b-2xl overflow-hidden">
            {/* Top fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />

            {/* Video grid skeleton */}
            <div className="h-[calc(100vh-100px)] overflow-y-scroll grid grid-cols-3 auto-rows-[120px] gap-3 px-6 no-scrollbar">
                {[...Array(12)].map((_, index) => {
                    const pattern = skeletonPattern[index % skeletonPattern.length];
                    const colSpanClass = pattern.colSpan === 2 ? 'col-span-2' : 'col-span-1';
                    const rowSpanClass = pattern.rowSpan === 2 ? 'row-span-2' : 'row-span-1';

                    return (
                        <Skeleton
                            key={index}
                            className={`${colSpanClass} ${rowSpanClass} rounded-xl w-full bg-white/10 animate-pulse`}
                            style={{ height: pattern.height }}
                        />
                    );
                })}
            </div>

            {/* Bottom fade with placeholder button */}
            <div className="absolute bottom-0 left-0 right-0 h-48 z-10 flex items-end justify-center pb-6">
                {/* Multiple gradient layers for enhanced contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <Skeleton className="h-12 w-48 rounded-lg relative z-20 bg-white/10 animate-pulse" />
            </div>
        </div>
    );
};
