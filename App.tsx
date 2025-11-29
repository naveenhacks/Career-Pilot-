import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Landing } from './components/Landing';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { Pricing } from './components/Pricing';
import { Auth } from './components/Auth';
import { ProfileEditor } from './components/ProfileEditor';
import { AiAssistant } from './components/AiAssistant';
import { AppView, UserProfile, AnalysisResult } from './types';
import { analyzeProfile } from './services/geminiService';
import { supabase } from './services/supabaseClient';

const App: React.FC = () => {
  const [currentView, setView] = useState<AppView>(AppView.LANDING);
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState<any>(null);

  // Initialize Supabase Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoggedIn(!!session);
      if (session) {
        fetchProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoggedIn(!!session);
      if (session) {
        // User just logged in
        fetchProfile(session.user.id);
      } else {
        // User logged out
        setUserProfile(null);
        setAnalysisData(null);
        setView(AppView.LANDING);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      }

      if (data) {
        // Hydrate state from DB
        const profile: UserProfile = {
          name: data.name,
          email: data.email,
          education: data.education,
          skills: data.skills,
          interests: data.interests,
          resumeText: data.resume_text,
        };
        setUserProfile(profile);
        
        if (data.analysis_data) {
          setAnalysisData(data.analysis_data);
          setView(AppView.DASHBOARD);
        } else {
          // Profile exists but no analysis? Go to dashboard or onboarding?
          // Let's assume incomplete profile if no analysis
          setView(AppView.ONBOARDING);
        }
      } else {
        // No profile found, direct to onboarding
        setView(AppView.ONBOARDING);
      }
    } catch (error) {
      console.error("Fetch profile failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToSupabase = async (profile: UserProfile, analysis: AnalysisResult | null) => {
    if (!session?.user) return;

    try {
      const updates = {
        id: session.user.id,
        name: profile.name,
        email: profile.email,
        education: profile.education,
        skills: profile.skills,
        interests: profile.interests,
        resume_text: profile.resumeText,
        analysis_data: analysis ? analysis : undefined,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      
      if (error) {
        console.error("Supabase upsert error:", error);
        // Fallback: If table doesn't exist, we just ignore so the app still works in demo mode
      }
    } catch (err) {
      console.error("Save to Supabase failed:", err);
    }
  };

  const performAnalysis = async (profile: UserProfile) => {
    setIsLoading(true);
    try {
      const result = await analyzeProfile(profile);
      setAnalysisData(result);
      setUserProfile(profile);
      setView(AppView.DASHBOARD);
      
      // Save data to Supabase if logged in
      if (session) {
        await saveToSupabase(profile, result);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Something went wrong with the AI analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartAnalysis = (profile: UserProfile) => {
    performAnalysis(profile);
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    // Re-run analysis with updated data
    performAnalysis(updatedProfile);
  };

  const handleAuthSuccess = () => {
    // This is now largely handled by onAuthStateChange, but we keep it for immediate feedback if needed
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <Landing onStart={() => setView(isLoggedIn ? AppView.DASHBOARD : AppView.REGISTER)} />;
      case AppView.LOGIN:
      case AppView.REGISTER:
        return (
          <Auth 
            view={currentView} 
            onSwitch={(v) => setView(v)} 
            onSuccess={handleAuthSuccess} 
          />
        );
      case AppView.ONBOARDING:
        return <Onboarding onSubmit={handleStartAnalysis} isLoading={isLoading} />;
      case AppView.DASHBOARD:
        return analysisData && userProfile ? (
          <Dashboard data={analysisData} userProfile={userProfile} setView={setView} />
        ) : (
          <Onboarding onSubmit={handleStartAnalysis} isLoading={isLoading} />
        );
      case AppView.PRICING:
        return <Pricing />;
      case AppView.PROFILE:
        return userProfile ? (
          <ProfileEditor 
            initialProfile={userProfile} 
            onSave={handleUpdateProfile} 
            onCancel={() => setView(AppView.DASHBOARD)}
            isLoading={isLoading}
          />
        ) : (
          <Onboarding onSubmit={handleStartAnalysis} isLoading={isLoading} />
        );
      default:
        return <Landing onStart={() => setView(AppView.REGISTER)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <Navbar 
        currentView={currentView} 
        setView={setView} 
        isLoggedIn={isLoggedIn} 
      />
      
      {/* Sign Out Button (Quick Access for Demo) */}
      {isLoggedIn && (
        <div className="fixed top-4 right-20 z-50 md:right-32">
             <button 
                onClick={handleLogout}
                className="text-xs text-gray-400 hover:text-white underline"
             >
                Sign Out
             </button>
        </div>
      )}

      <main className="relative z-10">
        {renderView()}
      </main>

      {/* Global AI Assistant Widget */}
      <AiAssistant />

      <footer className="relative z-10 border-t border-white/5 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} CareerPilot AI. Powered by Naveen Rajpoot.
        </div>
      </footer>
    </div>
  );
};

export default App;