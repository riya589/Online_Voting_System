import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Trash2, Award, PieChart, Plus, X, AlertCircle, CheckCircle } from 'lucide-react';
import api from '../services/api';
import StatCard from '../components/StatCard';

const AdminDashboard = () => {
    const [candidates, setCandidates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newCandidate, setNewCandidate] = useState({ 
        name: '', 
        party: '', 
        description: '', 
        photoUrl: '' 
    });

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await api.get('/candidates');
            setCandidates(response.data);
        } catch (err) {
            setError('Failed to fetch candidates. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCandidate = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await api.post('/candidates', newCandidate);
            setIsModalOpen(false);
            setNewCandidate({ name: '', party: '', description: '', photoUrl: '' });
            setSuccess('Candidate registered successfully.');
            fetchCandidates();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add candidate.');
        }
    };

    const handleDelete = async (candidate) => {
        if ((candidate.voteCount || 0) > 0) {
            setSuccess('');
            setError('This candidate cannot be deleted because votes have already been cast for them.');
            return;
        }

        if (!window.confirm('Delete this candidate?')) return;

        setError('');
        setSuccess('');

        try {
            const response = await api.delete(`/candidates/${candidate.id}`);
            setSuccess(response.data?.message || 'Candidate deleted successfully.');
            fetchCandidates();
        } catch (err) {
            setError(err.response?.data?.message || 'Deletion failed.');
        }
    };

    const totalVotes = candidates.reduce((sum, c) => sum + (c.voteCount || 0), 0);

    return (
        <div className="max-w-7xl mx-auto py-10 px-6">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-12 flex items-center gap-4">
                <Award className="w-10 h-10 text-blue-600" />
                Administrative Control Panel
            </h1>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <StatCard 
                    icon={<Users className="w-8 h-8" />}
                    title="Total Candidates"
                    value={candidates.length}
                    color="text-blue-600"
                />
                <StatCard 
                    icon={<PieChart className="w-8 h-8" />}
                    title="Total Votes Cast"
                    value={totalVotes}
                    color="text-green-600"
                />
                <StatCard 
                    icon={<Award className="w-8 h-8" />}
                    title="Current Leader"
                    value={candidates.length > 0 ? [...candidates].sort((a,b) => (b.voteCount || 0) - (a.voteCount || 0))[0].name : 'N/A'}
                    color="text-amber-600"
                />
            </div>

            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl mb-8 flex items-center gap-3"
                >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="font-semibold">{success}</p>
                </motion.div>
            )}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl mb-8 flex items-center gap-3"
                >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="font-semibold">{error}</p>
                </motion.div>
            )}

            {/* Candidate Management */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-800">Election Candidates</h2>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                        <Plus className="w-5 h-5" />
                        Register Candidate
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-8 py-6 text-left">Candidate Info</th>
                                <th className="px-8 py-6 text-left">Affiliation</th>
                                <th className="px-8 py-6 text-center">Vote Count</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {candidates.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            {c.photoUrl ? (
                                                <img src={c.photoUrl} alt={c.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-sm" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center">
                                                    <Users className="w-6 h-6 text-slate-400" />
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-bold text-slate-900">{c.name}</div>
                                                <div className="text-sm text-slate-500 max-w-xs truncate">{c.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                            {c.party}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-center font-extrabold text-slate-900 text-lg">
                                        {c.voteCount || 0}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        {c.voteCount > 0 && (
                                            <div className="text-xs font-semibold text-slate-500 mb-2">
                                                Candidates with votes cannot be deleted
                                            </div>
                                        )}
                                        <button 
                                            onClick={() => handleDelete(c)}
                                            disabled={c.voteCount > 0}
                                            className={`p-3 rounded-xl transition-all ${
                                                c.voteCount > 0
                                                    ? 'text-red-200 bg-red-500/10 cursor-not-allowed opacity-60'
                                                    : 'text-red-100 hover:text-red-600 bg-red-500/10 hover:bg-red-500/20'
                                            }`}
                                            title={c.voteCount > 0 ? 'Cannot delete a candidate who already has votes' : 'Delete Candidate'}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Candidate Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-24">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl relative z-10 w-full max-w-xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-blue-50/50">
                                <h3 className="text-2xl font-bold text-slate-800">Add New Candidate</h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-all">
                                    <X className="w-6 h-6 text-slate-500" />
                                </button>
                            </div>

                            <form onSubmit={handleAddCandidate} className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Candidate Name</label>
                                        <input 
                                            required
                                            value={newCandidate.name}
                                            onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Political Party</label>
                                        <input 
                                            required
                                            value={newCandidate.party}
                                            onChange={(e) => setNewCandidate({...newCandidate, party: e.target.value})}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Candidate Description</label>
                                    <textarea 
                                        rows="3"
                                        value={newCandidate.description}
                                        onChange={(e) => setNewCandidate({...newCandidate, description: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Candidate Image URL</label>
                                    <input 
                                        placeholder="https://example.com/photo.jpg"
                                        value={newCandidate.photoUrl}
                                        onChange={(e) => setNewCandidate({...newCandidate, photoUrl: e.target.value})}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-extrabold text-lg shadow-lg hover:bg-blue-700 transition-all"
                                >
                                    Proceed Registration
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
