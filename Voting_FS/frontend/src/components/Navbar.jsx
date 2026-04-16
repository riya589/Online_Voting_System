import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Vote, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#003366] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Vote className="w-8 h-8 text-[#ffd700]" />
          <span>E-VOTE INDIA</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-[#ffd700] transition-colors font-medium">Home</Link>
          <Link to="/results" className="hover:text-[#ffd700] transition-colors font-medium">Live Results</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-1 hover:text-[#ffd700] font-medium">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              {user.roles.includes('ROLE_ADMIN') && (
                <Link to="/admin" className="flex items-center gap-1 hover:text-[#ffd700] font-medium text-amber-300">
                  <Settings className="w-4 h-4" />
                  Admin
                </Link>
              )}
              <div className="h-6 w-[1px] bg-white/20 mx-2"></div>
              <div className="flex items-center gap-4">
                <span className="text-sm opacity-80 hidden md:inline">Welcome, <b>{user.name}</b></span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-100 p-2 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-4 py-2 hover:text-[#ffd700] font-medium">Login</Link>
              <Link to="/register" className="bg-[#ffd700] text-blue-900 px-6 py-2 rounded-full font-bold hover:bg-amber-400 transition-all shadow-md">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
