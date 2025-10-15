import { Routes, Route } from "react-router-dom";
import TopBar from './components/TopBar';
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { UserProvider } from "./contexts/UserContext";
import Home from "./pages/Home";
import Community from "./pages/Community";
import CommunityPost from "./pages/CommunityPost";
import CreationManagement from "./pages/CreationManagement";
import UserCenter from "./pages/UserCenter";



export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <UserProvider>
        <div className="min-h-screen relative">
          {/* Background gradient */}
          <div className="fixed inset-0 bg-gradient-to-br from-purple-900/30 via-black to-emerald-900/30 pointer-events-none" />
          {/* Radial gradient overlay */}
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            <TopBar />
            <div className="p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/community" element={<Community />} />
                <Route path="/community/:postId" element={<CommunityPost />} />
                <Route path="/creation-management" element={<CreationManagement />} />
                <Route path="/usercenter" element={<UserCenter />} />
              </Routes>
            </div>
          </div>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}
