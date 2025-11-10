import { Button } from "@/components/ui/button";
import { Sparkles, Video, Wand2, ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import LoginCard from "@/components/LoginCard";

export const Greeting = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useUser();
    const [showLogin, setShowLogin] = useState(false);

    const handleGetStarted = () => {
        if (isLoggedIn) {
            navigate('/');
        } else {
            setShowLogin(true);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Fullscreen Background Video */}
            <div className="absolute inset-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/CompleteVideoPlaceHolder.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
                {/* Logo/Icon */}
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-purple-600 to-emerald-600 p-6 rounded-full">
                        <Video className="h-16 w-16 text-white" />
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 text-center">
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
                        AIGC Platform
                    </span>
                </h1>

                {/* Subheading */}
                <p className="text-xl md:text-2xl text-white/80 mb-4 text-center max-w-3xl">
                    将您的创意转化为精彩视频
                </p>

                {/* Description */}
                <p className="text-md text-white/60 mb-12 text-center max-w-2xl">
                    通过先进的AI技术，让每个人都能轻松创作出专业级别的视频内容。
                    无需复杂的剪辑技能，只需描述您的想法，AI即可为您生成精美作品。
                </p>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl w-full">
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-105 hover:border-purple-500/50">
                        <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Sparkles className="h-6 w-6 text-purple-400" />
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-2">AI智能生成</h3>
                        <p className="text-white/60 text-sm">
                            利用最新的人工智能技术，根据文字描述自动生成高质量的视频素材，让创作变得简单高效。
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-105 hover:border-emerald-500/50">
                        <div className="bg-emerald-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Wand2 className="h-6 w-6 text-emerald-400" />
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-2">创意风格化</h3>
                        <p className="text-white/60 text-sm">
                            为您的视频应用各种艺术风格，从写实到抽象，从古典到现代，只需轻点即可实现风格转换。
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-105 hover:border-blue-500/50">
                        <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Play className="h-6 w-6 text-blue-400" />
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-2">一键导出</h3>
                        <p className="text-white/60 text-sm">
                            完成创作后，可轻松导出高清视频，并直接分享至各大社交媒体平台，让您的作品触达更多观众。
                        </p>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Button
                        onClick={handleGetStarted}
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
                    >
                        立即开始
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                        onClick={() => navigate('/community')}
                        size="lg"
                        variant="outline"
                        className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-lg"
                    >
                        探索画廊
                    </Button>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl w-full">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
                        <div className="text-sm text-white/60">视频作品</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white mb-2">5K+</div>
                        <div className="text-sm text-white/60">活跃用户</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white mb-2">99%</div>
                        <div className="text-sm text-white/60">满意度</div>
                    </div>
                </div>

                {/* Footer Text */}
                <div className="mt-16 text-center">
                    <p className="text-white/40 text-sm">
                        加入我们，开启您的AI视频创作之旅，让创意无限延伸
                    </p>
                </div>
            </div>

            {/* Floating Elements Animation */}
            <div className="absolute top-10 left-1/4 w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>
            <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-emerald-500 rounded-full animate-ping delay-700"></div>
            <div className="absolute top-1/3 right-10 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300"></div>

            {/* Login Dialog */}
            <LoginCard open={showLogin} onOpenChange={setShowLogin} />
        </div>
    );
};

export default Greeting;
