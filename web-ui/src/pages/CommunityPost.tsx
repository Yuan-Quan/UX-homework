import { useEffect, useState } from "react"
import { Heart, Share2, MessageCircle, ArrowLeft, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const CommunityPost = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const mockPost = {
        title: "Everything can be Ice Cream",
        author: "Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        category: "Addictive Generating",
        likes: 2847,
        comments: 342,
        shares: 156,
        description:
            "Monsenectuer adipiscing elit cras elementum dius pulvinar temporibus autem quibusdam et aut officiis debitis. Learn the best practices for crafting effective wireframes that communicate design intent clearly.",
        imageUrl: "/community_placeholder.png",
        date: "2 days ago",
        tags: ["Dreamy", "Fictinal", "Cute Art", "Dopamine Color"],
        model: "蒸汽机 2.0 turbo",
        prompt: "A england vintage street turns into whimsical ice cream town in a dreamy, pastel landscape with glowing elements and soft lighting",
        parameters: {
            "Steps": 45,
            "Guidance Scale": 7.5,
            "Sampler": "DPM++ 2M Karras",
            "Seed": 42837461,
            "Strength": 0.85,
            "Negative Prompt": "blurry, low quality, distorted",
            "Size": "1024x576",
            "Aspect Ratio": "16:9",
            "Face Restoration": "GFPGAN",
            "Enhance Prompt": "Yes",
            "Style": "Digital Art",
        },
    }

    return (
        <>
            {/* Sticky Header */}
            <div
                className={`sticky top-0 z-40 flex items-center gap-4 px-6 py-3 backdrop-blur-sm transition-all duration-200 ${isScrolled
                    ? "bg-background/85 shadow-lg"
                    : "bg-gradient-to-b from-background via-background/95 to-background/0"
                    }`}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/community")}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="flex-1 text-lg font-semibold text-white truncate">
                    {isLoading ? <Skeleton className="h-6 w-48 bg-white/20" /> : mockPost.title}
                </h1>
            </div>

            {/* Main Content */}
            <main className="flex h-full w-full flex-col overflow-y-auto p-6">
                <div className="mx-auto w-full max-w-7xl space-y-6">
                    {/* Top Row: Video & Parameters Side by Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Featured Video - Left 3 cols */}
                        <div className="lg:col-span-3">
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-xl">
                                {isLoading ? (
                                    <Skeleton className="aspect-video w-full bg-white/10" />
                                ) : (
                                    <>
                                        <video
                                            src="/Post1Video.mp4"
                                            controls
                                            className="aspect-video w-full object-cover"
                                        />
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Parameters - Right 1 col */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-24 space-y-3">
                                {/* Model Info */}
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 space-y-2">
                                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Model</h3>
                                    {isLoading ? (
                                        <Skeleton className="h-3 w-2/3 bg-white/15" />
                                    ) : (
                                        <p className="text-xs text-white/70 truncate">{mockPost.model}</p>
                                    )}
                                </div>

                                {/* Prompt */}
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 space-y-2">
                                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Prompt</h3>
                                    {isLoading ? (
                                        <div className="space-y-1">
                                            <Skeleton className="h-2 w-full bg-white/15" />
                                            <Skeleton className="h-2 w-full bg-white/15" />
                                            <Skeleton className="h-2 w-2/3 bg-white/15" />
                                        </div>
                                    ) : (
                                        <p className="text-xs text-white/70 leading-relaxed line-clamp-3">{mockPost.prompt}</p>
                                    )}
                                </div>

                                {/* Parameters */}
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 space-y-2 h-48 overflow-y-auto">
                                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Params</h3>
                                    {isLoading ? (
                                        <div className="space-y-1">
                                            {Array.from({ length: 6 }).map((_, i) => (
                                                <Skeleton key={i} className="h-2 w-full bg-white/15" />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {Object.entries(mockPost.parameters)
                                                .slice(0, 7)
                                                .map(([key, value]) => (
                                                    <div key={key} className="flex items-center justify-between gap-1">
                                                        <span className="text-xs text-white/50 truncate">{key}:</span>
                                                        <span className="text-xs font-mono text-white/70 truncate">{String(value)}</span>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>

                                {/* Tweak Button */}
                                {!isLoading && (
                                    <Button className="w-full gap-2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white hover:from-purple-700 hover:to-emerald-700 text-xs h-9">
                                        <Zap className="h-3 w-3" />
                                        Tweak
                                    </Button>
                                )}
                            </div>
                        </aside>
                    </div>

                    {/* Title & Tags */}
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="space-y-3">
                                <Skeleton className="h-8 w-3/4 bg-white/15" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-5 w-20 bg-white/10 rounded-full" />
                                    <Skeleton className="h-5 w-20 bg-white/10 rounded-full" />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <h1 className="text-3xl font-bold text-white leading-tight">
                                        {mockPost.title}
                                    </h1>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                                        {mockPost.category}
                                    </span>
                                    {mockPost.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs text-white/60 hover:bg-white/10 transition cursor-pointer"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Author & Meta */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                        {isLoading ? (
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-12 w-12 rounded-full bg-white/10" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24 bg-white/15" />
                                    <Skeleton className="h-3 w-16 bg-white/10" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <img
                                    src={mockPost.avatar}
                                    alt={mockPost.author}
                                    className="h-12 w-12 rounded-full border border-white/10"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-white">{mockPost.author}</p>
                                    <p className="text-xs text-white/50">{mockPost.date}</p>
                                </div>
                            </div>
                        )}

                        {!isLoading && (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2 text-white/70 hover:text-white hover:bg-white/10"
                                >
                                    <Heart className="h-4 w-4" />
                                    <span className="text-xs">{mockPost.likes}</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2 text-white/70 hover:text-white hover:bg-white/10"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    <span className="text-xs">{mockPost.comments}</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2 text-white/70 hover:text-white hover:bg-white/10"
                                >
                                    <Share2 className="h-4 w-4" />
                                    <span className="text-xs">{mockPost.shares}</span>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-4 border-t border-white/10 pt-6">
                        {isLoading ? (
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full bg-white/15" />
                                <Skeleton className="h-4 w-full bg-white/15" />
                                <Skeleton className="h-4 w-2/3 bg-white/15" />
                            </div>
                        ) : (
                            <p className="text-white/80 leading-relaxed">{mockPost.description}</p>
                        )}
                    </div>

                    {/* Related Posts Section */}
                    <div className="border-t border-white/10 pt-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Related Posts</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {isLoading
                                ? Array.from({ length: 2 }).map((_, i) => (
                                    <div key={i} className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <Skeleton className="aspect-video w-full rounded-lg bg-white/10" />
                                        <Skeleton className="h-4 w-3/4 bg-white/15" />
                                        <Skeleton className="h-3 w-1/2 bg-white/10" />
                                    </div>
                                ))
                                : [1, 2].map((i) => (
                                    <div key={i} className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
                                        <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-purple-500/20 to-emerald-500/20 mb-3" />
                                        <h3 className="text-sm font-semibold text-white group-hover:text-white/90">
                                            Related article title {i}
                                        </h3>
                                        <p className="text-xs text-white/50 mt-1">1 day ago</p>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Spacer */}
                    <div className="h-12" />
                </div>
            </main>
        </>
    )
}

export default CommunityPost
