import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(email, password);
    if (result.success) {
      if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.roles.includes('ROLE_ADMIN')) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center py-20 px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#003366] mb-2">Login to Vote</h1>
          <p className="text-slate-500">Secure entry for registered voters.</p>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-xl mb-6 flex items-center gap-3 text-red-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voter@example.com"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#003366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#002244] transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-slate-600">
          Not registered? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create an Account</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
