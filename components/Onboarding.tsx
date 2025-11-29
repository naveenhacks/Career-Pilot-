import React, { useState } from 'react';
import { Icons } from './Icons';
import { UserProfile } from '../types';
import { SkillSelector } from './SkillSelector';

interface OnboardingProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onSubmit, isLoading }) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    education: '',
    skills: '',
    interests: '',
    resumeText: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setError(null); // Clear error on user input
  };

  const handleSkillsChange = (newSkills: string) => {
    setProfile({ ...profile, skills: newSkills });
    setError(null);
  };

  const validateStep = (currentStep: number): boolean => {
    setError(null);
    if (currentStep === 1) {
      if (!profile.name.trim()) {
        setError("Full Name is required.");
        return false;
      }
      if (!profile.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
        setError("Please enter a valid email address.");
        return false;
      }
      if (!profile.education.trim()) {
        setError("Education / Role is required.");
        return false;
      }
    }
    if (currentStep === 2) {
      const skillCount = profile.skills.split(',').filter(s => s.trim()).length;
      if (skillCount < 3) {
        setError(`Please select at least 3 skills from the database (Current: ${skillCount}).`);
        return false;
      }
    }
    if (currentStep === 3) {
      if (profile.resumeText.trim().length < 50) {
        setError("Please provide more resume content (at least 50 characters) for accurate analysis.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => {
    setError(null);
    setStep(s => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      onSubmit(profile);
    }
  };

  // Progress Bar
  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
      <div className="glass-card w-full max-w-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden">
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-slate-900/90 flex flex-col items-center justify-center backdrop-blur-sm">
            <Icons.Loader className="w-16 h-16 text-blue-500 animate-spin mb-4" />
            <h3 className="text-2xl font-bold text-white">AI is Analyzing...</h3>
            <p className="text-blue-300 mt-2">Constructing your personalized career matrix</p>
          </div>
        )}

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Profile Setup</h2>
            <span className="text-blue-400 font-mono">Step {step}/3</span>
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="e.g. Naveen Rajpoot"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="careerpilo@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Education / Role</label>
                <input
                  type="text"
                  name="education"
                  value={profile.education}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="e.g. Senior CS Student, Stanford University"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <SkillSelector 
                  value={profile.skills} 
                  onChange={handleSkillsChange} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Interests & Hobbies</label>
                <textarea
                  name="interests"
                  value={profile.interests}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="e.g. AI Ethics, Gaming, Hiking, Open Source"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Resume / CV Content</label>
                <div className="relative">
                  <textarea
                    name="resumeText"
                    value={profile.resumeText}
                    onChange={handleChange}
                    rows={8}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono text-sm"
                    placeholder="Paste your resume text here..."
                  />
                  <div className="absolute top-3 right-3 text-gray-500">
                    <Icons.Resume className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * For this demo, please paste raw text. In production, we'd parse PDF/Word docs.
                </p>
              </div>
            </div>
          )}

          {/* Validation Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center text-red-400 text-sm animate-pulse">
              <Icons.Close className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Back
              </button>
            ) : <div></div>}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-blue-500/25 transition-all flex items-center"
              >
                Next <Icons.ArrowRight className="ml-2 w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-purple-500/25 transition-all flex items-center"
              >
                Launch Analysis <Icons.Rocket className="ml-2 w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};