import { Link } from 'react-router-dom';

const TopBar = () => {
    return (
        <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
            <div className="flex items-center">
                <img src="/logo_collapse.png" alt="Logo" className="h-8" />
            </div>
            <nav className="flex items-center space-x-6">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Home
                </Link>
                <Link to="/community" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Community
                </Link>
                <Link to="/creation-management" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Creation Management
                </Link>
                <Link to="/usercenter" className="text-gray-700 hover:text-blue-600 transition-colors">
                    User Center
                </Link>
            </nav>
        </div>
    );
};

export default TopBar;