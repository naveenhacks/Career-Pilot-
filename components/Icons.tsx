import React from 'react';
import { 
  Rocket, 
  BrainCircuit, 
  Target, 
  FileText, 
  TrendingUp, 
  Briefcase, 
  CheckCircle,
  XCircle,
  Menu,
  X,
  User,
  Zap,
  Lock,
  ChevronRight,
  Upload,
  Loader2,
  Mail,
  ArrowRight
} from 'lucide-react';

// Custom Google Icon Component since it's not in Lucide
const Google = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Custom Brand Logo
const Logo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brand_grad" x1="10" y1="90" x2="90" y2="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#A855F7" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Main Delta Wing Shape */}
    <path 
      d="M50 15L85 80L50 65L15 80L50 15Z" 
      fill="url(#brand_grad)" 
      stroke="url(#brand_grad)" 
      strokeWidth="2"
      strokeLinejoin="round"
    />
    
    {/* Inner detail for depth */}
    <path 
      d="M50 15L50 65" 
      stroke="rgba(255,255,255,0.3)" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    
    {/* Orbit Ring */}
    <path 
      d="M85 50C85 69.33 69.33 85 50 85C30.67 85 15 69.33 15 50" 
      stroke="url(#brand_grad)" 
      strokeWidth="3" 
      strokeLinecap="round"
      opacity="0.5"
    />
    <circle cx="85" cy="50" r="3" fill="#A855F7" />
  </svg>
);

export const Icons = {
  Rocket,
  Brain: BrainCircuit,
  Target,
  Resume: FileText,
  Chart: TrendingUp,
  Briefcase,
  Check: CheckCircle,
  Close: XCircle,
  Menu,
  X,
  User,
  Zap,
  Lock,
  ArrowRight: ChevronRight || ArrowRight, 
  Upload,
  Loader: Loader2,
  Mail,
  Google,
  Logo
};