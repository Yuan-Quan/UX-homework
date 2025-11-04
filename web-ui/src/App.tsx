import { Routes, Route, useLocation } from "react-router-dom";
import TopBar from './components/TopBar';
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { UserProvider } from "./contexts/UserContext";
import Home from "./pages/Home";
import Community from "./pages/Community";
import CommunityPost from "./pages/CommunityPost";
import CreationManagement from "./pages/CreationManagement";
import UserCenter from "./pages/UserCenter";
import ProjectWorkbench from "./pages/ProjectWorkbench";
import Greeting from "./pages/Greeting";



export default function App() {
  const location = useLocation();
  const isWorkbench = location.pathname.startsWith("/workbench");
  const isGreeting = location.pathname === "/greeting";

  return (
    <ThemeProvider defaultTheme="dark">
      <UserProvider>
        <div className="min-h-screen relative">
          {/* Background gradient */}
          {!isGreeting && <div className="fixed inset-0 bg-gradient-to-br from-purple-900/30 via-black to-emerald-900/30 pointer-events-none" />}
          {/* Radial gradient overlay */}
          {!isGreeting && <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />}

          {/* Content */}
          <div className="relative z-10">
            {!isWorkbench && !isGreeting && <TopBar />}
            {!isWorkbench && !isGreeting && <div className="p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/community" element={<Community />} />
                <Route path="/community/:postId" element={<CommunityPost />} />
                <Route path="/creation-management" element={<CreationManagement />} />
                <Route path="/usercenter" element={<UserCenter />} />
              </Routes>
            </div>}
            {isGreeting && (
              <Routes>
                <Route path="/greeting" element={<Greeting />} />
              </Routes>
            )}
            {isWorkbench && (
              <Routes>
                <Route path="/workbench/:projectName" element={<ProjectWorkbench />} />
                <Route path="/workbench/:projectName/:tab" element={<ProjectWorkbench />} />
              </Routes>
            )}
          </div>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}
