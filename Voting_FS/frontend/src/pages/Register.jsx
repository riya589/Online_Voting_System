import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ShieldCheck, UserPlus, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    voterId: '',
    role: 'voter'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(formData);
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center py-12 px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg border border-slate-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#003366] mb-2">Create Voter Account</h1>
          <p className="text-slate-500">Register with your official Voter ID to participate.</p>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-xl mb-6 flex items-center gap-3 text-red-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Full Name (as per ID)</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                name="email"
                type="email" 
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Voter ID */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Voter ID Number</label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                name="voterId"
                required
                value={formData.voterId}
                onChange={handleInputChange}
                placeholder="VOT-123456"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                name="password"
                type="password" 
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Account Role</label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select 
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
              >
                <option value="voter">Citizen (Voter)</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>


          <button 
            type="submit" 
            disabled={loading}
            className="w-full md:col-span-2 bg-[#ffd700] text-blue-900 py-4 rounded-xl font-extrabold text-lg hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg mt-4"
          >
            {loading ? 'Creating Account...' : (
              <>
                <UserPlus className="w-5 h-5" />
                Register to Vote
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-slate-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
