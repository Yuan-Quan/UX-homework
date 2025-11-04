import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Download,
    Upload,
    Share2,
    Play,
    CheckCircle2,
    Youtube,
    Twitter,
    Facebook,
    Instagram,
    Globe
} from "lucide-react";

export const DeliverTab = () => {
    const [videoTitle, setVideoTitle] = useState("My AIGC Video");
    const [videoDescription, setVideoDescription] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleDownload = () => {
        // Simulate download
        const link = document.createElement('a');
        link.href = '/CompleteVideoPlaceHolder.mp4';
        link.download = `${videoTitle}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleUploadToCommunity = async () => {
        setIsUploading(true);
        setUploadSuccess(false);
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsUploading(false);
        setUploadSuccess(true);
    };

    return (
        <div className="h-full flex flex-col bg-black/10 p-4 gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">输出</h2>
                <div className="text-xs text-white/60">导出并分享您的视频</div>
            </div>

            <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Left: Video Preview */}
                <div className="flex-1 bg-black/30 rounded-lg border border-white/10 flex flex-col">
                    <div className="p-3 border-b border-white/10 flex items-center justify-between">
                        <h3 className="text-white font-semibold">最终视频预览</h3>
                        <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                        >
                            <Play className="mr-2 h-3 w-3" />
                            播放
                        </Button>
                    </div>
                    <div className="flex-1 bg-black/50 flex items-center justify-center p-6">
                        <video
                            src="/CompleteVideoPlaceHolder.mp4"
                            className="max-w-full max-h-full rounded shadow-2xl"
                            controls
                        />
                    </div>
                </div>

                {/* Right: Export & Share Options */}
                <div className="w-96 flex flex-col gap-4">
                    {/* Video Info */}
                    <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                        <h3 className="text-white font-semibold mb-3 text-sm">视频信息</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-white/70 text-xs mb-1 block">标题</label>
                                <Input
                                    value={videoTitle}
                                    onChange={(e) => setVideoTitle(e.target.value)}
                                    className="bg-white/5 border-white/20 text-white"
                                    placeholder="输入视频标题"
                                />
                            </div>
                            <div>
                                <label className="text-white/70 text-xs mb-1 block">描述</label>
                                <textarea
                                    value={videoDescription}
                                    onChange={(e) => setVideoDescription(e.target.value)}
                                    className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/40 min-h-[80px] rounded-md p-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="输入视频描述（可选）"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Download */}
                    <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Download className="h-4 w-4 text-blue-400" />
                            <h3 className="text-white font-semibold text-sm">下载</h3>
                        </div>
                        <p className="text-white/60 text-xs mb-3">
                            将视频下载到您的本地设备
                        </p>
                        <Button
                            onClick={handleDownload}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            下载视频
                        </Button>
                    </div>

                    {/* Upload to Community */}
                    <div className="bg-black/30 rounded-lg border border-white/10 p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Upload className="h-4 w-4 text-purple-400" />
                            <h3 className="text-white font-semibold text-sm">社区</h3>
                        </div>
                        <p className="text-white/60 text-xs mb-3">
                            与AIGC社区分享您的创作
                        </p>
                        <Button
                            onClick={handleUploadToCommunity}
                            disabled={isUploading || uploadSuccess}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            {isUploading ? (
                                <>
                                    <Upload className="mr-2 h-4 w-4 animate-bounce" />
                                    上传中...
                                </>
                            ) : uploadSuccess ? (
                                <>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    上传成功
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    上传到社区
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Social Media Sharing */}
                    <div className="bg-black/30 rounded-lg border border-white/10 p-4 flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <Share2 className="h-4 w-4 text-emerald-400" />
                            <h3 className="text-white font-semibold text-sm">社交媒体</h3>
                        </div>
                        <p className="text-white/60 text-xs mb-4">
                            直接分享到您喜欢的平台
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                className="bg-red-600/20 border-red-500/50 text-white hover:bg-red-600/30"
                            >
                                <Youtube className="mr-2 h-4 w-4" />
                                YouTube
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-blue-600/20 border-blue-500/50 text-white hover:bg-blue-600/30"
                            >
                                <Twitter className="mr-2 h-4 w-4" />
                                Twitter
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-blue-700/20 border-blue-600/50 text-white hover:bg-blue-700/30"
                            >
                                <Facebook className="mr-2 h-4 w-4" />
                                Facebook
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-pink-600/20 border-pink-500/50 text-white hover:bg-pink-600/30"
                            >
                                <Instagram className="mr-2 h-4 w-4" />
                                Instagram
                            </Button>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full mt-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
                        >
                            <Globe className="mr-2 h-4 w-4" />
                            更多平台
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliverTab;
