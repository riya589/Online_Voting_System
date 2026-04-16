import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Vote, ShieldCheck, BarChart3, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-[#003366] text-white py-20 px-8 rounded-3xl mt-4 mb-20 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Vote size={480} strokeWidth={0.5} />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-extrabold mb-6 leading-tight"
          >
            Empowering Democracy, <br/>
            <span className="text-[#ffd700]">One Vote at a Time.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed"
          >
            Welcome to the National Secure E-Voting Platform. A transparent, 
            tamper-proof, and accessible governance system designed for modern citizens.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <Link 
              to="/register" 
              className="bg-[#ffd700] text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-400 transition-all shadow-xl hover:translate-y-[-2px]"
            >
              Get Started Now
            </Link>
            <Link 
              to="/results" 
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              View Live Results
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-16 text-slate-800">Why Choose Our Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<ShieldCheck className="w-12 h-12 text-blue-600" />}
            title="Secure & Private"
            description="End-to-end encryption ensures your vote is your own and cannot be tampered with."
          />
          <FeatureCard 
            icon={<BarChart3 className="w-12 h-12 text-blue-600" />}
            title="Real-time Analytics"
            description="Transparent counting with live charts showing the distribution of votes."
          />
          <FeatureCard 
            icon={<Users className="w-12 h-12 text-blue-600" />}
            title="Voter Accessibility"
            description="Universal access for registered voters across the country, anytime, anywhere."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-10 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center"
  >
    <div className="bg-blue-50 p-6 rounded-2xl mb-6">{icon}</div>
    <h3 className="text-xl font-bold mb-4 text-slate-800">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </motion.div>
);

export default Home;
