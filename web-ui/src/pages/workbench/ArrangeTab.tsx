import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, SkipBack, SkipForward, Trash2, Plus, X, Sparkles } from "lucide-react";

interface TimelineClip {
    id: string;
    url: string;
    name: string;
    duration: number;
    startTime: number;
    maxDuration?: number; // Maximum duration (actual video length)
}

const footageLibrary = [
    { id: "1", name: "AutumLeafs", url: "/Footages/AutumLeafs.mp4" },
    { id: "2", name: "Prediction 1", url: "/Footages/Prediction 1.mp4" }
];

export const ArrangeTab = () => {
    const [timelineClips, setTimelineClips] = useState<TimelineClip[]>([
        { id: "clip-1", url: "/Footages/AutumLeafs.mp4", name: "AutumLeafs", duration: 5, startTime: 0, maxDuration: 10 },
        { id: "clip-2", url: "/Footages/Prediction 1.mp4", name: "Prediction 1", duration: 5, startTime: 5, maxDuration: 10 }
    ]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [selectedClip, setSelectedClip] = useState<string | null>(null);
    const [draggedClip, setDraggedClip] = useState<string | null>(null);
    const [resizingClip, setResizingClip] = useState<string | null>(null);
    const [resizeStartX, setResizeStartX] = useState(0);
    const [resizeStartDuration, setResizeStartDuration] = useState(0);
    const [showTransitionDialog, setShowTransitionDialog] = useState(false);
    const [transitionClipIndex, setTransitionClipIndex] = useState<number | null>(null);
    const [transitionPrompt, setTransitionPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPlayingTimeline, setIsPlayingTimeline] = useState(false);
    const [timelineCurrentTime, setTimelineCurrentTime] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const timelineVideoRef = useRef<HTMLVideoElement>(null);

    const totalDuration = timelineClips.reduce((sum, clip) => sum + clip.duration, 0);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleSeek = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    // Timeline video handlers
    const handleTimelinePlayPause = () => {
        if (timelineVideoRef.current) {
            if (isPlayingTimeline) {
                timelineVideoRef.current.pause();
            } else {
                timelineVideoRef.current.play();
            }
            setIsPlayingTimeline(!isPlayingTimeline);
        }
    };

    const handleTimelineTimeUpdate = () => {
        if (timelineVideoRef.current) {
            setTimelineCurrentTime(timelineVideoRef.current.currentTime);
        }
    };

    const handleTimelineSeek = (time: number) => {
        if (timelineVideoRef.current) {
            timelineVideoRef.current.currentTime = time;
            setTimelineCurrentTime(time);
        }
    };

    const addClipToTimeline = (footage: typeof footageLibrary[0]) => {
        const lastClip = timelineClips[timelineClips.length - 1];
        const startTime = lastClip ? lastClip.startTime + lastClip.duration : 0;

        const newClip: TimelineClip = {
            id: `clip-${Date.now()}`,
            url: footage.url,
            name: footage.name,
            duration: 5,
            startTime: startTime,
            maxDuration: 10 // Default max duration for footage clips
        };

        setTimelineClips([...timelineClips, newClip]);
    };

    const removeClipFromTimeline = (clipId: string) => {
        const filtered = timelineClips.filter(c => c.id !== clipId);
        // Recalculate start times
        const recalculated = filtered.map((clip, idx) => ({
            ...clip,
            startTime: idx === 0 ? 0 : filtered[idx - 1].startTime + filtered[idx - 1].duration
        }));
        setTimelineClips(recalculated);
        if (selectedClip === clipId) {
            setSelectedClip(null);
        }
    };

    const handleClipSelect = (clipId: string) => {
        setSelectedClip(clipId);
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
    };

    // Drag and drop handlers
    const handleDragStart = (e: React.DragEvent, clipId: string) => {
        setDraggedClip(clipId);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e: React.DragEvent, targetClipId: string) => {
        e.preventDefault();
        if (!draggedClip || draggedClip === targetClipId) return;

        setTimelineClips(clips => {
            const draggedIndex = clips.findIndex(c => c.id === draggedClip);
            const targetIndex = clips.findIndex(c => c.id === targetClipId);

            if (draggedIndex === -1 || targetIndex === -1) return clips;

            const newClips = [...clips];
            const [removed] = newClips.splice(draggedIndex, 1);
            newClips.splice(targetIndex, 0, removed);

            // Recalculate start times
            const recalculated = newClips.map((clip, idx) => ({
                ...clip,
                startTime: idx === 0 ? 0 : newClips[idx - 1].startTime + newClips[idx - 1].duration
            }));
            return recalculated;
        });
        setDraggedClip(null);
    };

    const handleDragEnd = () => {
        setDraggedClip(null);
    };

    // Transition generation
    const handleOpenTransitionDialog = (index: number) => {
        setTransitionClipIndex(index);
        setShowTransitionDialog(true);
    };

    const handleGenerateTransition = async () => {
        if (transitionClipIndex === null) return;

        setIsGenerating(true);
        // Simulate generation delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const transitionClip: TimelineClip = {
            id: `transition-${Date.now()}`,
            url: "/InterplotGeneration/replicate-prediction-0558ny41ahrme0cta2aajykjjc.mp4",
            name: `Transition: ${transitionPrompt || "Generated"}`,
            duration: 3,
            startTime: 0,
            maxDuration: 5 // Transitions have a shorter max duration
        };

        setTimelineClips(clips => {
            const newClips = [...clips];
            newClips.splice(transitionClipIndex + 1, 0, transitionClip);
            // Recalculate start times
            const recalculated = newClips.map((clip, idx) => ({
                ...clip,
                startTime: idx === 0 ? 0 : newClips[idx - 1].startTime + newClips[idx - 1].duration
            }));
            return recalculated;
        });

        setShowTransitionDialog(false);
        setTransitionClipIndex(null);
        setTransitionPrompt("");
        setIsGenerating(false);
    };    // Resize handlers
    const handleResizeStart = (e: React.MouseEvent, clipId: string, currentDuration: number) => {
        e.stopPropagation();
        setResizingClip(clipId);
        setResizeStartX(e.clientX);
        setResizeStartDuration(currentDuration);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!resizingClip) return;

            const deltaX = e.clientX - resizeStartX;
            const deltaDuration = deltaX / 40; // 40px per second

            setTimelineClips(clips => {
                const updatedClips = clips.map(clip => {
                    if (clip.id === resizingClip) {
                        const newDuration = resizeStartDuration + deltaDuration;
                        // Clamp between 1 second and maxDuration (or resizeStartDuration if no max set)
                        const clampedDuration = Math.max(1, Math.min(newDuration, clip.maxDuration || resizeStartDuration));
                        return { ...clip, duration: clampedDuration };
                    }
                    return clip;
                });
                // Recalculate start times
                const recalculated = updatedClips.map((clip, idx) => ({
                    ...clip,
                    startTime: idx === 0 ? 0 : updatedClips[idx - 1].startTime + updatedClips[idx - 1].duration
                }));
                return recalculated;
            });
        };

        const handleMouseUp = () => {
            setResizingClip(null);
        };

        if (resizingClip) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [resizingClip, resizeStartX, resizeStartDuration]);

    return (
        <div className="h-full flex flex-col bg-black/10">
            {/* Top Section */}
            <div className="h-[calc(100vh-400px)] flex gap-3 p-3 overflow-hidden">
                {/* Left: Footage Library */}
                <div className="w-56 bg-black/30 rounded-lg border border-white/10 flex flex-col">
                    <div className="p-2 border-b border-white/10">
                        <h3 className="text-white font-semibold text-sm">素材库</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        <div className="space-y-2">
                            {footageLibrary.map((footage) => (
                                <div
                                    key={footage.id}
                                    onClick={() => addClipToTimeline(footage)}
                                    className="group cursor-pointer bg-black/30 rounded border border-white/20 hover:border-purple-500/50 transition-all p-2"
                                >
                                    <div className="relative aspect-video rounded overflow-hidden mb-1 bg-black/50">
                                        <video
                                            src={footage.url}
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                            <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center">
                                                <div className="w-0 h-0 border-l-[3px] border-l-white border-y-[2.5px] border-y-transparent ml-0.5"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-white/80 truncate">{footage.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Preview and Controls */}
                <div className="flex-1 flex flex-col gap-2">
                    {/* Preview Section - Two Videos Side by Side */}
                    <div className="flex-1 flex gap-2 min-h-0">
                        {/* Clip Preview */}
                        <div className="flex-1 bg-black/30 rounded-lg border border-white/10 flex flex-col min-h-0">
                            <div className="p-2 border-b border-white/10">
                                <h3 className="text-white font-semibold text-sm">片段预览</h3>
                            </div>
                            <div className="flex-1 flex items-center justify-center bg-black/50 p-2 min-h-0">
                                <div className="w-full h-full flex items-center justify-center min-h-0">
                                    {selectedClip ? (
                                        <video
                                            ref={videoRef}
                                            src={timelineClips.find(c => c.id === selectedClip)?.url}
                                            onTimeUpdate={handleTimeUpdate}
                                            onEnded={() => setIsPlaying(false)}
                                            className="max-w-full max-h-full rounded"
                                            controls={false}
                                            key={selectedClip}
                                        />
                                    ) : timelineClips.length > 0 ? (
                                        <video
                                            ref={videoRef}
                                            src={timelineClips[0]?.url}
                                            onTimeUpdate={handleTimeUpdate}
                                            onEnded={() => setIsPlaying(false)}
                                            className="max-w-full max-h-full rounded"
                                            controls={false}
                                        />
                                    ) : (
                                        <div className="text-white/40 text-sm">时间轴中没有片段</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Full Timeline Preview */}
                        <div className="flex-1 bg-black/30 rounded-lg border border-white/10 flex flex-col min-h-0">
                            <div className="p-2 border-b border-white/10">
                                <h3 className="text-white font-semibold text-sm">完整时间轴</h3>
                            </div>
                            <div className="flex-1 flex items-center justify-center bg-black/50 p-2 min-h-0">
                                <div className="w-full h-full flex items-center justify-center min-h-0">
                                    <video
                                        ref={timelineVideoRef}
                                        src="/CompleteVideoPlaceHolder.mp4"
                                        onTimeUpdate={handleTimelineTimeUpdate}
                                        onEnded={() => setIsPlayingTimeline(false)}
                                        muted
                                        playsInline
                                        className="max-w-full max-h-full rounded"
                                        controls={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Playback Controls - Split for both previews */}
                    <div className="flex gap-2">
                        {/* Clip Preview Controls */}
                        <div className="flex-1 bg-black/30 rounded-lg border border-white/10 p-2">
                            <div className="flex items-center justify-center gap-3">
                                <Button
                                    onClick={() => handleSeek(0)}
                                    variant="outline"
                                    size="icon"
                                    className="bg-white/5 hover:bg-white/10 border-white/20 text-white h-8 w-8"
                                >
                                    <SkipBack className="h-3 w-3" />
                                </Button>
                                <Button
                                    onClick={handlePlayPause}
                                    size="icon"
                                    className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white h-8 w-8"
                                >
                                    {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5" />}
                                </Button>
                                <Button
                                    onClick={() => handleSeek(totalDuration)}
                                    variant="outline"
                                    size="icon"
                                    className="bg-white/5 hover:bg-white/10 border-white/20 text-white h-8 w-8"
                                >
                                    <SkipForward className="h-3 w-3" />
                                </Button>
                            </div>
                            <div className="mt-2">
                                <div className="flex justify-between text-xs text-white/60 mb-1">
                                    <span>{Math.floor(currentTime)}s</span>
                                    <span>{Math.floor(totalDuration)}s</span>
                                </div>
                                <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="absolute h-full bg-gradient-to-r from-purple-600 to-emerald-600 transition-all"
                                        style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Timeline Preview Controls */}
                        <div className="flex-1 bg-black/30 rounded-lg border border-white/10 p-2">
                            <div className="flex items-center justify-center gap-3">
                                <Button
                                    onClick={() => handleTimelineSeek(0)}
                                    variant="outline"
                                    size="icon"
                                    className="bg-white/5 hover:bg-white/10 border-white/20 text-white h-8 w-8"
                                >
                                    <SkipBack className="h-3 w-3" />
                                </Button>
                                <Button
                                    onClick={handleTimelinePlayPause}
                                    size="icon"
                                    className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white h-8 w-8"
                                >
                                    {isPlayingTimeline ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5" />}
                                </Button>
                                <Button
                                    onClick={() => handleTimelineSeek(timelineVideoRef.current?.duration || 0)}
                                    variant="outline"
                                    size="icon"
                                    className="bg-white/5 hover:bg-white/10 border-white/20 text-white h-8 w-8"
                                >
                                    <SkipForward className="h-3 w-3" />
                                </Button>
                            </div>
                            <div className="mt-2">
                                <div className="flex justify-between text-xs text-white/60 mb-1">
                                    <span>{Math.floor(timelineCurrentTime)}s</span>
                                    <span>{Math.floor(timelineVideoRef.current?.duration || 0)}s</span>
                                </div>
                                <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="absolute h-full bg-gradient-to-r from-purple-600 to-emerald-600 transition-all"
                                        style={{ width: `${(timelineCurrentTime / (timelineVideoRef.current?.duration || 1)) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom: Timeline */}
            <div className="h-40 bg-black/30 border-t border-white/10 flex flex-col">
                <div className="p-2 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-white font-semibold text-sm">时间轴</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-white/60">总时长: {totalDuration}秒</span>
                    </div>
                </div>
                {/* Timecode Ruler */}
                <div className="relative h-6 bg-black/20 border-b border-white/10 overflow-hidden">
                    <div className="absolute inset-0 flex">
                        {Array.from({ length: Math.ceil(totalDuration) + 1 }).map((_, i) => (
                            <div key={i} className="relative" style={{ width: '40px' }}>
                                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />
                                <span className="absolute left-1 top-1 text-[9px] text-white/50">{i}s</span>
                            </div>
                        ))}
                    </div>
                    {/* Playhead */}
                    <div
                        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 transition-all"
                        style={{ left: `${(timelineCurrentTime / totalDuration) * totalDuration * 40}px` }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-red-500" />
                    </div>
                </div>
                <div className="flex-1 overflow-x-auto overflow-y-hidden p-2 relative">
                    <div className="flex gap-0 h-full items-center">
                        {timelineClips.map((clip, index) => (
                            <>
                                <div
                                    key={clip.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, clip.id)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, clip.id)}
                                    onDragEnd={handleDragEnd}
                                    onClick={() => handleClipSelect(clip.id)}
                                    className={`relative group cursor-move rounded-lg overflow-hidden border-2 transition-all h-full ${selectedClip === clip.id
                                        ? "border-purple-500 shadow-lg shadow-purple-500/50"
                                        : "border-white/20 hover:border-white/50"
                                        } ${draggedClip === clip.id ? "opacity-50" : ""}`}
                                    style={{ width: `${clip.duration * 40}px`, minWidth: `${clip.duration * 40}px`, height: '100%' }}
                                >
                                    <div className="relative w-full h-full bg-black/50">
                                        <video
                                            src={clip.url}
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2">
                                            <p className="text-xs text-white font-medium truncate">{clip.name}</p>
                                            <p className="text-[10px] text-white/60">{clip.duration.toFixed(1)}s</p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeClipFromTimeline(clip.id);
                                            }}
                                            className="absolute top-1 right-1 bg-red-600/80 hover:bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        >
                                            <Trash2 className="h-3 w-3 text-white" />
                                        </button>
                                        {/* Extend clip icon (left edge) */}
                                        <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center group/extend z-10">
                                            <div className="opacity-0 group-hover:opacity-100 group-hover/extend:opacity-100 transition-opacity">
                                                <div className="bg-emerald-600/90 hover:bg-emerald-600 rounded-full p-1 shadow-lg cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                                    <Sparkles className="h-3 w-3 text-white" />
                                                </div>
                                            </div>
                                            {/* Extend tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/extend:opacity-100 transition-opacity pointer-events-none">
                                                <div className="bg-black/90 border border-white/20 rounded px-2 py-1 shadow-lg whitespace-nowrap">
                                                    <p className="text-white text-[10px]">使用提示词延长片段</p>
                                                </div>
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black/90"></div>
                                            </div>
                                        </div>
                                        {/* Resize handle */}
                                        <div
                                            onMouseDown={(e) => handleResizeStart(e, clip.id, clip.duration)}
                                            className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize bg-white/0 hover:bg-purple-500/30 transition-colors z-10"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </div>
                                {/* Transition gap between clips */}
                                {index < timelineClips.length - 1 && (
                                    <div
                                        className="relative group/gap w-8 h-full flex items-center justify-center cursor-pointer"
                                        onClick={() => handleOpenTransitionDialog(index)}
                                    >
                                        <div className="h-full w-0.5 bg-white/10 group-hover/gap:bg-purple-500/50 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="opacity-0 group-hover/gap:opacity-100 transition-opacity">
                                                <div className="bg-purple-600/90 rounded-full p-1.5 shadow-lg">
                                                    <Plus className="h-3 w-3 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/gap:opacity-100 transition-opacity pointer-events-none">
                                            <div className="bg-black/90 border border-white/20 rounded px-2 py-1 shadow-lg whitespace-nowrap">
                                                <p className="text-white text-[10px]">点击添加转场</p>
                                            </div>
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black/90"></div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                        {timelineClips.length === 0 && (
                            <div className="flex-1 flex items-center justify-center text-white/40">
                                <p>将素材拖拽到时间轴</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Transition Generation Dialog */}
            {showTransitionDialog && transitionClipIndex !== null && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => !isGenerating && setShowTransitionDialog(false)}>
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-xl p-6 shadow-2xl w-[450px]" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white text-lg font-semibold">生成转场</h3>
                            <button
                                onClick={() => {
                                    if (!isGenerating) {
                                        setShowTransitionDialog(false);
                                        setTransitionClipIndex(null);
                                        setTransitionPrompt("");
                                    }
                                }}
                                disabled={isGenerating}
                                className="text-white/60 hover:text-white transition-colors disabled:opacity-50"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-white/80 text-sm mb-2">
                                在 <span className="text-purple-400 font-medium">"{timelineClips[transitionClipIndex].name}"</span> 和 <span className="text-emerald-400 font-medium">"{timelineClips[transitionClipIndex + 1].name}"</span> 之间
                            </p>
                        </div>

                        <div className="mb-6">
                            <label className="text-white/70 text-sm mb-2 block">
                                转场提示词（可选）
                            </label>
                            <Input
                                placeholder="描述转场效果..."
                                value={transitionPrompt}
                                onChange={(e) => setTransitionPrompt(e.target.value)}
                                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                                disabled={isGenerating}
                            />
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={handleGenerateTransition}
                                disabled={isGenerating}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white"
                            >
                                {isGenerating ? "生成中..." : "生成转场"}
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowTransitionDialog(false);
                                    setTransitionClipIndex(null);
                                    setTransitionPrompt("");
                                }}
                                disabled={isGenerating}
                                variant="outline"
                                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                            >
                                取消
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArrangeTab;
