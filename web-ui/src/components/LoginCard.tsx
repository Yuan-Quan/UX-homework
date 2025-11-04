import { useState } from "react";
import { Mail, Lock, User, X } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useUser } from "@/contexts/UserContext";

interface LoginCardProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const LoginCard = ({ open, onOpenChange }: LoginCardProps) => {
    const { login } = useUser();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Demo mock user data
        const mockUser = {
            name: isSignUp ? name : "Demo User",
            email: email || "demo@example.com",
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email || "demo"}`,
        };

        login(mockUser);
        onOpenChange(false);

        // Reset form
        setEmail("");
        setPassword("");
        setName("");
        setIsSignUp(false);
    };

    if (!open) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={() => onOpenChange(false)}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-sm bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-lg shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                {isSignUp ? "创建账户" : "欢迎回来"}
                            </h2>
                            <p className="text-sm text-white/70 mt-1">
                                {isSignUp
                                    ? "注册账号，开始创作和分享您的AI生成内容"
                                    : "登录您的账户，使用所有功能"}
                            </p>
                        </div>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="text-white/50 hover:text-white transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <form onSubmit={handleSubmit} className="space-y-4 p-6">
                        {isSignUp && (
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                                <Input
                                    placeholder="姓名"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                                    required={isSignUp}
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                            <Input
                                type="email"
                                placeholder="电子邮箱"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                            <Input
                                type="password"
                                placeholder="密码"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 text-white hover:from-purple-700 hover:to-emerald-700"
                        >
                            {isSignUp ? "注册" : "登录"}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gradient-to-b from-slate-900 to-slate-950 text-white/50">
                                    或
                                </span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="w-full border-white/10 text-white hover:bg-white/5"
                        >
                            {isSignUp
                                ? "已有账户？立即登录"
                                : "还没有账户？立即注册"}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginCard;
