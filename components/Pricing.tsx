import React from 'react';
import { Icons } from './Icons';

export const Pricing: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-white mb-4">Invest in Your Future</h2>
      <p className="text-gray-400 mb-16 max-w-2xl mx-auto">Choose the plan that fits your career stage. Unlock AI-driven insights to fast-track your employment.</p>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Free Plan */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col items-center">
          <div className="text-xl font-bold text-white mb-2">Cadet</div>
          <div className="text-5xl font-bold text-white mb-6">Free</div>
          <ul className="space-y-4 mb-8 text-left w-full px-4">
            <li className="flex items-center text-gray-300"><Icons.Check className="w-5 h-5 text-blue-500 mr-3"/> Basic Skill Analysis</li>
            <li className="flex items-center text-gray-300"><Icons.Check className="w-5 h-5 text-blue-500 mr-3"/> 3 Career Matches</li>
            <li className="flex items-center text-gray-300"><Icons.Check className="w-5 h-5 text-blue-500 mr-3"/> Generic Roadmap</li>
          </ul>
          <button className="mt-auto w-full py-3 rounded-xl bg-slate-700 text-white font-bold hover:bg-slate-600 transition-colors">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="relative glass-card p-8 rounded-3xl border border-purple-500/50 flex flex-col items-center shadow-2xl shadow-purple-500/20">
          <div className="absolute -top-4 bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
            Most Popular
          </div>
          <div className="text-xl font-bold text-white mb-2">Commander</div>
          <div className="text-5xl font-bold text-white mb-6">₹199<span className="text-lg text-gray-400 font-normal">/mo</span></div>
          <ul className="space-y-4 mb-8 text-left w-full px-4">
            <li className="flex items-center text-gray-300"><Icons.Check className="w-5 h-5 text-purple-400 mr-3"/> Deep AI Resume Optimization</li>
            <li className="flex items-center text-gray-300"><Icons.Check className="w-5 h-5 text-purple-400 mr-3"/> Unlimited Career Matches</li>
            <li className="flex items-center text-gray-300"><Icons.Check className="w-5 h-5 text-purple-400 mr-3"/> Live Job Market Data</li>
            <li className="flex items-center text-gray-300"><Icons.Check className="w-5 h-5 text-purple-400 mr-3"/> 1-on-1 Mentorship Intro</li>
          </ul>
          <button className="mt-auto w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-lg transition-all">
            Upgrade Now
          </button>
        </div>

      </div>
    </div>
  );
};