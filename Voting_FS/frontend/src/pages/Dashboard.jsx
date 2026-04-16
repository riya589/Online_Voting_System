import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import CandidateCard from '../components/CandidateCard';

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await api.get('/candidates');
      setCandidates(response.data);
    } catch (err) {
      setError('Could not load candidates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    if (user.hasVoted) return;
    
    setVoting(true);
    setError('');
    
    try {
      await api.post(`/vote/${candidateId}`);
      setSuccess('Your vote has been cast successfully!');
      
      // Update local user state
      const updatedUser = { ...user, hasVoted: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // Refresh candidates (if needed for counts, though usually hidden till end)
      fetchCandidates();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cast vote.');
    } finally {
      setVoting(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <RefreshCw className="animate-spin w-10 h-10 text-blue-600" />
      <p className="text-slate-500 font-medium">Loading Electoral Candidates...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Voter Dashboard</h1>
          <p className="text-slate-500">Official candidate list for General Election 2026.</p>
        </div>
        
        {user.hasVoted ? (
          <div className="bg-green-100 text-green-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            VOTING COMPLETE
          </div>
        ) : (
          <div className="bg-amber-100 text-amber-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            ACTION REQUIRED: CAST YOUR VOTE
          </div>
        )}
      </div>

      {/* Status Messages */}
      {success && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-600 text-white p-4 rounded-xl mb-8 font-bold text-center"
        >
          {success}
        </motion.div>
      )}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-600 text-white p-4 rounded-xl mb-8 font-bold text-center"
        >
          {error}
        </motion.div>
      )}

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {candidates.map((candidate) => (
          <CandidateCard 
            key={candidate.id} 
            candidate={candidate} 
            onVote={handleVote}
            hasVoted={user.hasVoted}
            loading={voting}
          />
        ))}
      </div>

      {candidates.length === 0 && (
        <div className="text-center py-20 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300">
          <p className="text-slate-500 font-medium">No candidates registered for this election yet.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
