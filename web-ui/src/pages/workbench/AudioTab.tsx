import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Music, Mic, Sparkles } from "lucide-react";

export const AudioTab = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [voiceoverPrompt, setVoiceoverPrompt] = useState("");
    const [bgmPrompt, setBgmPrompt] = useState("");
    const [isGeneratingVO, setIsGeneratingVO] = useState(false);
    const [isGeneratingBGM, setIsGeneratingBGM] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const totalDuration = 10; // Placeholder duration

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

    const handleGenerateVoiceover = async () => {
        setIsGeneratingVO(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsGeneratingVO(false);
    };

    const handleGenerateBGM = async () => {
        setIsGeneratingBGM(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsGeneratingBGM(false);
    };

    return (
        <div className="h-full flex flex-col bg-black/10">
            {/* Top Section */}
            <div className="h-[calc(100vh-400px)] flex gap-3 p-3 overflow-hidden">
                {/* Left: Audio Controls */}
                <div className="w-80 flex flex-col gap-3">
                    {/* Voiceover Control */}
                    <div className="bg-black/30 rounded-lg border border-white/10 flex flex-col">
                        <div className="p-3 border-b border-white/10 flex items-center gap-2">
                            <Mic className="h-4 w-4 text-blue-400" />
                            <h3 className="text-white font-semibold text-sm">旁白</h3>
                        </div>
                        <div className="p-3 flex flex-col gap-2">
                            <label className="text-white/70 text-xs">语音描述</label>
                            <textarea
                                placeholder='描述旁白...（例如："平静的男性旁白"、"充满活力的女性声音"）'
                                value={voiceoverPrompt}
                                onChange={(e) => setVoiceoverPrompt(e.target.value)}
                                className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/40 min-h-[80px] rounded-md p-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isGeneratingVO}
                            />
                            <Button
                                onClick={handleGenerateVoiceover}
                                disabled={isGeneratingVO || !voiceoverPrompt}
                                size="sm"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {isGeneratingVO ? (
                                    <>
                                        <Sparkles className="mr-2 h-3 w-3 animate-spin" />
                                        生成中...
                                    </>
                                ) : (
                                    <>
                                        <Mic className="mr-2 h-3 w-3" />
                                        生成旁白
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* BGM Control */}
                    <div className="bg-black/30 rounded-lg border border-white/10 flex flex-col">
                        <div className="p-3 border-b border-white/10 flex items-center gap-2">
                            <Music className="h-4 w-4 text-emerald-400" />
                            <h3 className="text-white font-semibold text-sm">背景音乐</h3>
                        </div>
                        <div className="p-3 flex flex-col gap-2">
                            <label className="text-white/70 text-xs">音乐描述</label>
                            <textarea
                                placeholder='描述背景音乐...（例如："欢快的电子音乐"、"轻松的钢琴曲"）'
                                value={bgmPrompt}
                                onChange={(e) => setBgmPrompt(e.target.value)}
                                className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/40 min-h-[80px] rounded-md p-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                disabled={isGeneratingBGM}
                            />
                            <Button
                                onClick={handleGenerateBGM}
                                disabled={isGeneratingBGM || !bgmPrompt}
                                size="sm"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                {isGeneratingBGM ? (
                                    <>
                                        <Sparkles className="mr-2 h-3 w-3 animate-spin" />
                                        生成中...
                                    </>
                                ) : (
                                    <>
                                        <Music className="mr-2 h-3 w-3" />
                                        生成背景音乐
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Audio Info */}
                    <div className="flex-1 bg-black/30 rounded-lg border border-white/10 p-3">
                        <h3 className="text-white font-semibold text-sm mb-2">音频图层</h3>
                        <div className="space-y-2 text-xs text-white/60">
                            <div className="flex items-center justify-between">
                                <span>旁白：</span>
                                <span className="text-white/40">未生成</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>背景音乐：</span>
                                <span className="text-white/40">未生成</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Preview */}
                <div className="flex-1 flex flex-col gap-2">
                    {/* Video Preview */}
                    <div className="flex-1 bg-black/30 rounded-lg border border-white/10 flex flex-col min-h-0">
                        <div className="p-2 border-b border-white/10">
                            <h3 className="text-white font-semibold text-sm">完整时间轴预览</h3>
                        </div>
                        <div className="flex-1 flex items-center justify-center bg-black/50 p-2 min-h-0">
                            <div className="w-full h-full flex items-center justify-center min-h-0">
                                <video
                                    ref={videoRef}
                                    src="/CompleteVideoPlaceHolder.mp4"
                                    onTimeUpdate={handleTimeUpdate}
                                    onEnded={() => setIsPlaying(false)}
                                    muted
                                    playsInline
                                    className="max-w-full max-h-full rounded"
                                    controls={false}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Playback Controls */}
                    <div className="bg-black/30 rounded-lg border border-white/10 p-2">
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
                                className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white h-10 w-10"
                            >
                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
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
                </div>
            </div>

            {/* Bottom: Audio Timeline */}
            <div className="h-48 bg-black/30 border-t border-white/10 flex flex-col">
                <div className="p-2 border-b border-white/10">
                    <h3 className="text-white font-semibold text-sm">音频时间轴</h3>
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
                        style={{ left: `${(currentTime / totalDuration) * totalDuration * 40}px` }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-red-500" />
                    </div>
                </div>

                {/* Audio Tracks */}
                <div className="flex-1 overflow-x-auto overflow-y-hidden p-2">
                    <div className="flex flex-col gap-2 h-full">
                        {/* Voiceover Track */}
                        <div className="h-12 bg-black/30 rounded border border-white/10 flex items-center px-3 gap-3">
                            <div className="flex items-center gap-2 w-32">
                                <Mic className="h-3 w-3 text-blue-400" />
                                <span className="text-xs text-white/70">旁白</span>
                            </div>
                            <div className="flex-1 relative h-8 bg-black/20 rounded">
                                {voiceoverPrompt && (
                                    <div className="absolute inset-y-0 left-0 bg-blue-600/30 border border-blue-400/50 rounded flex items-center px-2" style={{ width: '100%' }}>
                                        <span className="text-[10px] text-white/70 truncate">{voiceoverPrompt}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* BGM Track */}
                        <div className="h-12 bg-black/30 rounded border border-white/10 flex items-center px-3 gap-3">
                            <div className="flex items-center gap-2 w-32">
                                <Music className="h-3 w-3 text-emerald-400" />
                                <span className="text-xs text-white/70">背景音乐</span>
                            </div>
                            <div className="flex-1 relative h-8 bg-black/20 rounded">
                                {bgmPrompt && (
                                    <div className="absolute inset-y-0 left-0 bg-emerald-600/30 border border-emerald-400/50 rounded flex items-center px-2" style={{ width: '100%' }}>
                                        <span className="text-[10px] text-white/70 truncate">{bgmPrompt}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioTab;
