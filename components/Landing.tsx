import React from 'react';
import { Icons } from './Icons';
import { AppView } from '../types';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center">
      
      {/* Hero Badge */}
      <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-8 animate-fade-in-up">
        <span className="flex h-2 w-2 relative mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        AI-Powered Career Intelligence
      </div>

      {/* Hero Title */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
        Navigate Your Future with <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Precision & Confidence
        </span>
      </h1>

      {/* Hero Subtitle */}
      <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto mb-10">
        Stop guessing. Let our advanced AI analyze your skills, optimize your resume, and map out a personalized career path aligned with real-time market demand.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <button 
          onClick={onStart}
          className="group relative px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all flex items-center justify-center"
        >
          Analyze My Career
          <Icons.ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Mini Pricing Comparison - Vertical Format */}
      <div className="w-full max-w-2xl mx-auto mb-20 animate-fade-in">
        <h2 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest text-center">Quick Plan Comparison</h2>
        
        <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
            {/* Free Row */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors group">
                <div className="text-left">
                    <h3 className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">Cadet (Free)</h3>
                    <p className="text-sm text-gray-500">Basic analysis & generic roadmap</p>
                </div>
                <div className="text-right">
                    <span className="block text-2xl font-bold text-slate-200">₹0</span>
                </div>
            </div>

            {/* Paid Row */}
            <div className="p-5 bg-gradient-to-r from-blue-900/20 to-purple-900/20 flex items-center justify-between hover:bg-white/5 transition-colors relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                <div className="text-left">
                    <h3 className="text-lg font-bold text-white flex items-center">
                        Commander <Icons.Zap className="w-4 h-4 text-purple-400 ml-2" />
                    </h3>
                    <p className="text-sm text-purple-200">AI Resume Fix, Live Data, Unlimited</p>
                </div>
                <div className="text-right">
                    <span className="block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">₹199</span>
                    <span className="text-xs text-gray-400">/month</span>
                </div>
            </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-20">
        {[
          { icon: Icons.Brain, title: "AI Skill Analysis", desc: "Deep learning algorithms detect your hidden strengths and gaps." },
          { icon: Icons.Target, title: "Smart Matching", desc: "Match with careers that fit your profile with over 95% accuracy." },
          { icon: Icons.Resume, title: "Resume Enhancer", desc: "Get real-time feedback to pass ATS scanners and impress recruiters." }
        ].map((feature, idx) => (
          <div key={idx} className="glass-card p-8 rounded-2xl text-left hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact Us Section */}
      <div className="w-full max-w-md mx-auto animate-fade-in">
        <h2 className="text-sm font-bold text-blue-400 tracking-wider uppercase mb-4">Contact Us</h2>
        <a 
          href="mailto:steallthbreak@gmail.com" 
          className="glass-card p-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-white/5 transition-all group border border-white/10 hover:border-blue-500/30"
        >
          <div className="bg-slate-800 p-2 rounded-full group-hover:bg-blue-500/20 transition-colors">
            <Icons.Mail className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-lg text-gray-300 group-hover:text-white transition-colors font-medium">
            steallthbreak@gmail.com
          </span>
        </a>
      </div>

    </div>
  );
};