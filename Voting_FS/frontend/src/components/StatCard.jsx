import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon, title, value, color }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6`}
    >
      <div className={`p-5 rounded-2xl ${color} bg-opacity-10 text-${color}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</h4>
        <p className="text-3xl font-extrabold text-slate-900">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
