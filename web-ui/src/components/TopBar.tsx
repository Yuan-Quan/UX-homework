import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut, Bell, Gift } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useUser } from "@/contexts/UserContext";
import LoginCard from "./LoginCard";

const navItems = [
    { label: "Home", path: "/" },
    { label: "Community", path: "/community" },
    { label: "Creation Management", path: "/creation-management" },
    { label: "User Center", path: "/usercenter" },
];

const TopBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isLoggedIn, logout } = useUser();
    const [showLoginCard, setShowLoginCard] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between px-4 py-2 bg-black/20 backdrop-blur-sm border-b border-white/10">
                <div className="flex items-center">
                    <img src="/logo_collapse.png" alt="Logo" className="h-8" />
                </div>
                <nav className="flex items-center space-x-4">
                    {navItems.map((item) => {
                        const isActive = item.path === "/"
                            ? location.pathname === "/"
                            : location.pathname.startsWith(item.path);

                        return (
                            <Button
                                key={item.path}
                                variant="ghost"
                                onClick={() => !isActive && navigate(item.path)}
                                className={cn(
                                    "text-white/90 hover:text-white hover:bg-white/10",
                                    isActive && "bg-white/15 text-white hover:bg-white/15"
                                )}
                                disabled={isActive}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {item.label}
                            </Button>
                        );
                    })}
                </nav>

                {/* Auth Section */}
                <div className="flex items-center gap-3">
                    {isLoggedIn && user ? (
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white/70 hover:text-white hover:bg-white/10"
                                title="Notifications"
                            >
                                <Bell className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white/70 hover:text-white hover:bg-white/10"
                                title="Rewards"
                            >
                                <Gift className="h-5 w-5" />
                            </Button>
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-8 w-8 rounded-full border border-white/20"
                            />
                            <span className="text-sm text-white/80 hidden sm:inline">{user.name}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={logout}
                                className="text-white/70 hover:text-white hover:bg-white/10"
                                title="Logout"
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={() => setShowLoginCard(true)}
                            className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white hover:from-purple-700 hover:to-emerald-700"
                        >
                            Login / Sign Up
                        </Button>
                    )}
                </div>
            </div>

            <LoginCard open={showLoginCard} onOpenChange={setShowLoginCard} />
        </>
    );
};

export default TopBar;