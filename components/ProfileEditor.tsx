import React, { useState } from 'react';
import { Icons } from './Icons';
import { UserProfile } from '../types';
import { SkillSelector } from './SkillSelector';

interface ProfileEditorProps {
  initialProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ initialProfile, onSave, onCancel, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSkillsChange = (newSkills: string) => {
    setProfile({ ...profile, skills: newSkills });
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!profile.name.trim() || !profile.email.trim() || !profile.education.trim()) {
      setError("Please fill in all required text fields (Name, Email, Education).");
      return;
    }

    const skillCount = profile.skills.split(',').filter(s => s.trim()).length;
    if (skillCount < 3) {
      setError(`Please select at least 3 skills from the database (Current: ${skillCount}).`);
      return;
    }

    if (profile.resumeText.trim().length < 50) {
      setError("Resume content is too short to analyze. Please provide more detail.");
      return;
    }

    onSave(profile);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
            <p className="text-gray-400 text-sm mt-1">Update your details to refine your career analysis.</p>
          </div>
          <button 
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Icons.X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-slate-900/90 flex flex-col items-center justify-center backdrop-blur-sm">
            <Icons.Loader className="w-16 h-16 text-blue-500 animate-spin mb-4" />
            <h3 className="text-2xl font-bold text-white">Re-calibrating Career Path...</h3>
            <p className="text-blue-300 mt-2">Analyzing new data points</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Education / Role</label>
            <input
              type="text"
              name="education"
              value={profile.education}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Resume / CV Content</label>
            <div className="relative">
              <textarea
                name="resumeText"
                value={profile.resumeText}
                onChange={handleChange}
                rows={10}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono text-sm"
              />
              <div className="absolute top-3 right-3 text-gray-500">
                <Icons.Resume className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Validation Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center text-red-400 text-sm animate-pulse">
              <Icons.Close className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-purple-500/25 transition-all flex items-center"
            >
              {isLoading ? (
                <>
                  <Icons.Loader className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Save & Update Analysis
                  <Icons.Zap className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};