import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle2, ChevronRight } from 'lucide-react';

const CandidateCard = ({ candidate, onVote, hasVoted, loading }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border ${hasVoted ? 'border-green-200 bg-green-50/20' : 'border-slate-100'}`}
    >
      <div className="h-48 bg-slate-200 relative overflow-hidden">
        {candidate.photoUrl ? (
          <img src={candidate.photoUrl} alt={candidate.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
            <User size={80} />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-900 shadow-sm">
          {candidate.party}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{candidate.name}</h3>
        <p className="text-slate-600 text-sm mb-6 line-clamp-2">{candidate.description}</p>
        
        {hasVoted ? (
          <div className="w-full bg-green-100 text-green-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Vote Recorded
          </div>
        ) : (
          <button 
            disabled={loading}
            onClick={() => onVote(candidate.id)}
            className="w-full bg-[#003366] text-white py-3 rounded-xl font-bold hover:bg-[#002244] transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? 'Casting Vote...' : (
              <>
                Cast Your Vote
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CandidateCard;
