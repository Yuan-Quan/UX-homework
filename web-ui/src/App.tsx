import { Routes, Route } from "react-router-dom";
import TopBar from './components/TopBar';

function Home() {
  return <h1 className="text-2xl font-bold text-blue-600">Home</h1>;
}

function Community() {
  return <h1 className="text-2xl font-bold text-green-600">Community</h1>;
}

function CreationManagement() {
  return <h1 className="text-2xl font-bold text-red-600">Creation Management</h1>;
}

function UserCenter() {
  return <h1 className="text-2xl font-bold text-purple-600">User Center</h1>;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/creation-management" element={<CreationManagement />} />
          <Route path="/usercenter" element={<UserCenter />} />
        </Routes>
      </div>
    </div>
  );
}
