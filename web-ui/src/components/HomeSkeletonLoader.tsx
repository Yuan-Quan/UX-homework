import { Skeleton } from "@/components/ui/skeleton";

export const HomeSkeletonLoader = () => {
    return (
        <div className="min-h-screen overflow-hidden bg-background flex justify-center">
            <div className="w-full max-w-[1600px] flex flex-col lg:flex-row gap-8 px-4 lg:px-8">
                {/* Left column skeleton - Project Panel */}
                <div className="lg:w-[650px] lg:h-screen lg:overflow-hidden lg:flex-shrink-0 lg:py-8">
                    <div className="px-4 py-6 lg:px-0 lg:py-0">
                        <Skeleton className="h-10 w-80 mb-3 mx-auto lg:mx-0" />
                        <Skeleton className="h-5 w-96 mb-4 mx-auto lg:mx-0" />
                    </div>

                    {/* Projects List Skeleton */}
                    <div className="w-full flex flex-col px-4 lg:px-6">
                        <div className="flex-none">
                            <div className="sticky top-0 bg-background/80 backdrop-blur-sm pb-2">
                                <Skeleton className="h-5 w-24 mb-3 mx-auto lg:mx-0" />
                                <Skeleton className="h-8 w-full mb-3" />
                            </div>
                        </div>

                        {/* Project cards skeleton */}
                        <div className="h-[calc(100vh-380px)] rounded-md border border-white/10 bg-white/5 p-3">
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
                                        <div className="flex gap-3">
                                            <Skeleton className="flex-none w-20 h-20 rounded-md" />
                                            <div className="flex-1 min-w-0 space-y-2">
                                                <Skeleton className="h-5 w-48" />
                                                <Skeleton className="h-4 w-64" />
                                                <Skeleton className="h-3 w-20 ml-auto" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column skeleton - VideoWall */}
                <div className="flex-1 lg:h-screen lg:py-8 mb-24 lg:mb-0 flex items-center justify-center">
                    <div className="w-full max-w-[800px] space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                            {[...Array(12)].map((_, i) => (
                                <Skeleton key={i} className="w-full h-[120px] rounded-xl" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
