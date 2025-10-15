import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

const Community = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            setIsScrolled(scrollTop > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <section className="flex h-full w-full flex-col gap-0">
            <div className={`sticky top-0 z-30 px-6 py-3 backdrop-blur-sm transition-all duration-200 ${isScrolled
                ? "bg-background/85 shadow-lg"
                : "bg-gradient-to-b from-background via-background/95 to-background/0"
                }`}>
                <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold tracking-tight text-white">
                            Community
                        </h1>
                        <p className="max-w-2xl text-xs text-white/60">
                            Discover the latest community artworks and creators
                        </p>
                    </div>

                    <div className="relative w-full lg:w-72 lg:shrink-0">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <Input
                            type="search"
                            placeholder="Search artworks, creators..."
                            className="border-white/15 bg-white/10 pl-9 text-sm text-white placeholder:text-white/50 focus-visible:ring-white/30 hover:bg-white/15"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-6 p-6">
                <div
                    className="relative flex-1 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-background/70 via-background/15 to-emerald-500/10 shadow-[0_20px_45px_rgba(15,23,42,0.35)]"
                    aria-busy={isLoading}
                    aria-live="polite"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
                    <div className="relative z-[1] flex h-full flex-col gap-6 p-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="space-y-1">
                                <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/70 text-white">
                                    Community Spotlight
                                </p>
                                <h2 className="text-2xl font-semibold text-white">
                                    Today’s Featured Gallery
                                </h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-9 w-36 rounded-full bg-white/10 shadow-inner" />
                                <Skeleton className="h-9 w-20 rounded-full bg-white/10 shadow-inner" />
                            </div>
                        </div>

                        <div className="relative flex-1 overflow-hidden rounded-2xl bg-white/10 backdrop-blur">
                            {isLoading ? (
                                <div className="grid h-full w-full grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                                        <span className="sr-only">Loading community hero preview…</span>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Skeleton className="relative h-[85%] w-[90%] overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                                                <span className="pointer-events-none absolute inset-0 block h-full w-full animate-[shine_1.8s_linear_infinite] bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.25)_45%,transparent_90%)]" />
                                            </Skeleton>
                                        </div>
                                        <div className="absolute inset-x-6 bottom-6 space-y-2">
                                            <Skeleton className="h-6 w-1/2 bg-white/20 shadow-inner" />
                                            <Skeleton className="h-4 w-2/3 bg-white/20 shadow-inner" />
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col gap-5 rounded-2xl border border-white/10 bg-white/10 p-5">
                                        {Array.from({ length: 4 }).map((_, idx) => (
                                            <div key={idx} className="space-y-2">
                                                <Skeleton className="h-5 w-2/3 bg-white/20 shadow-inner" />
                                                <Skeleton className="h-3 w-4/5 bg-white/20 shadow-inner" />
                                                <Skeleton className="h-3 w-3/5 bg-white/20 shadow-inner" />
                                                <div className="h-px w-full rounded-full bg-white/10" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="relative flex h-full w-full items-center justify-center cursor-pointer" onClick={() => navigate("/community/1")}>
                                    <img
                                        src="/community_placeholder.png"
                                        alt="Community showcase placeholder"
                                        className="h-full w-full object-cover hover:opacity-95 transition-opacity"
                                        loading="lazy"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Community