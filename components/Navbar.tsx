import React from 'react';
import { Icons } from './Icons';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isLoggedIn }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer group" onClick={() => setView(AppView.LANDING)}>
            <div className="mr-3 transition-transform group-hover:scale-110 duration-300">
               <Icons.Logo className="w-10 h-10" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              CareerPilot
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button 
                onClick={() => setView(AppView.LANDING)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === AppView.LANDING ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Home
              </button>
              {isLoggedIn && (
                <button 
                  onClick={() => setView(AppView.DASHBOARD)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === AppView.DASHBOARD ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Dashboard
                </button>
              )}
              <button 
                onClick={() => setView(AppView.PRICING)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === AppView.PRICING ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Pricing
              </button>
            </div>
          </div>

          <div>
             {!isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setView(AppView.LOGIN)}
                    className="text-gray-300 hover:text-white text-sm font-medium transition-colors hidden sm:block"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => setView(AppView.REGISTER)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-blue-500/20"
                  >
                    Get Started
                  </button>
                </div>
             ) : (
                <div 
                  className="flex items-center space-x-3 cursor-pointer group"
                  onClick={() => setView(AppView.PROFILE)}
                >
                    <span className={`text-sm transition-colors mr-2 hidden sm:block ${currentView === AppView.PROFILE ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      Edit Profile
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center border border-white/20 shadow-lg group-hover:shadow-pink-500/20 transition-all">
                        <Icons.User className="w-4 h-4 text-white" />
                    </div>
                </div>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
};