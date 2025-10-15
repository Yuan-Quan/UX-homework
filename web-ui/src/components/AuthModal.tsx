import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X } from "lucide-react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const { login } = useUser();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const handleLogin = () => {
        if (name.trim() && email.trim()) {
            const newUser = {
                name: name,
                email: email,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
            };
            login(newUser);
            setEmail("");
            setName("");
            onClose();
        }
    };

    const handleDemoLogin = () => {
        const demoUser = {
            name: "Demo User",
            email: "demo@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
        };
        login(demoUser);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-gradient-to-b from-black/95 to-black/90 border border-white/10 rounded-lg shadow-lg p-6 sm:p-8">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome</h2>
                    <p className="text-white/60 text-sm">Sign in to continue</p>
                </div>

                {/* Form */}
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Name
                        </label>
                        <Input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Email
                        </label>
                        <Input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                    <Button
                        onClick={handleLogin}
                        disabled={!name.trim() || !email.trim()}
                        className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 text-white hover:from-purple-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={handleDemoLogin}
                        variant="ghost"
                        className="w-full text-white/80 hover:text-white hover:bg-white/10 border border-white/10"
                    >
                        Try Demo Account
                    </Button>
                </div>

                {/* Divider */}
                <div className="my-4 flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-white/50">Demo Only</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Footer */}
                <p className="text-xs text-white/50 text-center">
                    This is a demo. No real data is stored.
                </p>
            </div>
        </div>
    );
};

export default AuthModal;
