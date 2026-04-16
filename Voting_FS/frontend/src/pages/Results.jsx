import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Trophy, Users, BarChart3, RefreshCw } from 'lucide-react';
import api from '../services/api';

const Results = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 10000); // Auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchResults = async () => {
    try {
      const response = await api.get('/candidates');
        setData(Array.isArray(response.data) ? response.data.map(c => ({
          name: c.name,
          votes: c.voteCount || 0,
          party: c.party
        })) : []);
      } catch (err) {
        console.error('Results fetch failed:', err);
        setData([]);
      } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <RefreshCw className="animate-spin w-10 h-10 text-blue-600" />
      <p className="text-slate-500 font-medium">Calculating Live Results...</p>
    </div>
  );

  const winner = data.length > 0 ? [...data].sort((a,b) => b.votes - a.votes)[0] : null;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block p-3 bg-blue-50 rounded-2xl mb-4"
        >
          <BarChart3 className="w-10 h-10 text-blue-600" />
        </motion.div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Live Election Results</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Transparent, real-time vote counting for the General Election 2026. 
          Data refreshes automatically every 10 seconds.
        </p>
      </div>

      {winner && winner.votes > 0 && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-3xl shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Trophy size={160} />
          </div>
          <div className="z-10">
            <span className="bg-white/20 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 inline-block">Current Frontrunner</span>
            <h2 className="text-4xl font-black mb-2">{winner.name}</h2>
            <p className="text-blue-100 text-lg font-medium">{winner.party} — {winner.votes} Official Votes</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center z-10">
            <div className="text-4xl font-black mb-1 leading-none">{Math.round((winner.votes / data.reduce((s,v)=>s+v.votes, 0)) * 100) || 0}%</div>
            <div className="text-xs font-bold uppercase opacity-60">Vote Share</div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Bar Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-[400px]">
          <h3 className="text-xl font-bold text-slate-800 mb-8">Vote Distribution (Bar)</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="votes" radius={[10, 10, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-[400px]">
          <h3 className="text-xl font-bold text-slate-800 mb-8">Vote Share (Pie)</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="votes"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Results;
