import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';

// Comprehensive list of valid skills for suggestions
const VALID_SKILLS = [
  // Programming & Dev
  "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Go", "Rust", "Swift", "Kotlin", "PHP", "Ruby",
  "HTML", "CSS", "React", "Angular", "Vue.js", "Next.js", "Node.js", "Django", "Flask", "Spring Boot",
  ".NET", "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "GraphQL", "REST API",
  "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "Terraform", "Jenkins", "Git", "CI/CD",
  
  // Data & AI
  "Machine Learning", "Deep Learning", "Data Analysis", "Data Visualization", "TensorFlow", "PyTorch",
  "Pandas", "NumPy", "Scikit-learn", "Tableau", "Power BI", "Excel", "Statistics", "NLP", "Computer Vision",
  
  // Design
  "UI Design", "UX Design", "Figma", "Adobe XD", "Photoshop", "Illustrator", "Sketch", "Prototyping",
  "Wireframing", "User Research", "Web Design", "Graphic Design",
  
  // Soft Skills & Business
  "Project Management", "Agile", "Scrum", "Communication", "Leadership", "Teamwork", "Problem Solving",
  "Time Management", "Critical Thinking", "Public Speaking", "Writing", "Negotiation", "Sales", "Marketing",
  "SEO", "Content Strategy", "Social Media Marketing", "Product Management", "Business Analysis"
].sort();

interface SkillSelectorProps {
  value: string; // Comma separated string of skills
  onChange: (value: string) => void;
}

export const SkillSelector: React.FC<SkillSelectorProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Convert comma-separated string to array
  const selectedSkills = value ? value.split(',').map(s => s.trim()).filter(s => s) : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setError(null);

    if (val.length > 0) {
      const matches = VALID_SKILLS.filter(skill => 
        skill.toLowerCase().includes(val.toLowerCase()) && 
        !selectedSkills.includes(skill)
      );
      setSuggestions(matches.slice(0, 5)); // Limit to 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const addSkill = (skill: string) => {
    // Prevent duplicates
    if (selectedSkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
        setError(`'${skill}' is already added.`);
        return;
    }

    const newSkills = [...selectedSkills, skill];
    onChange(newSkills.join(', '));
    setInputValue('');
    setSuggestions([]);
    setError(null);
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = selectedSkills.filter(skill => skill !== skillToRemove);
    onChange(newSkills.join(', '));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      attemptAddSkill();
    } else if (e.key === 'Backspace' && inputValue === '' && selectedSkills.length > 0) {
      removeSkill(selectedSkills[selectedSkills.length - 1]);
    }
  };

  const attemptAddSkill = () => {
    if (!inputValue.trim()) return;

    const rawInput = inputValue.trim();
    
    // Check database for a proper capitalization match
    const databaseMatch = VALID_SKILLS.find(s => s.toLowerCase() === rawInput.toLowerCase());

    // Use the database match if found (better casing), otherwise use the user's raw input
    addSkill(databaseMatch || rawInput);
  };

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSuggestions([]);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Key Skills <span className="text-gray-500 text-xs ml-2">(Type to add custom skills)</span>
      </label>
      
      <div 
        className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white transition-all flex flex-wrap gap-2 min-h-[50px] ${
          error ? 'border-red-500 ring-1 ring-red-500' : isFocused ? 'border-blue-500 ring-2 ring-blue-500' : 'border-slate-600'
        }`}
        onClick={() => document.getElementById('skill-input')?.focus()}
      >
        {selectedSkills.map((skill, idx) => (
          <span key={idx} className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-md text-sm flex items-center border border-blue-500/30 animate-fade-in">
            {skill}
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); removeSkill(skill); }}
              className="ml-1 hover:text-white transition-colors"
            >
              <Icons.X className="w-3 h-3" />
            </button>
          </span>
        ))}
        
        <input
          id="skill-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          className="bg-transparent border-none outline-none flex-grow min-w-[120px] text-white placeholder-gray-500"
          placeholder={selectedSkills.length === 0 ? "Type to search or add custom..." : ""}
          autoComplete="off"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="absolute -bottom-6 left-0 text-xs text-red-400 font-medium animate-pulse flex items-center">
            <Icons.Close className="w-3 h-3 mr-1" />
            {error}
        </div>
      )}

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-slate-800 border border-slate-600 rounded-lg mt-1 shadow-xl max-h-48 overflow-y-auto">
          {suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              onClick={() => addSkill(suggestion)}
              className="px-4 py-2 hover:bg-blue-600/20 hover:text-blue-300 cursor-pointer text-sm text-gray-300 transition-colors"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      
      <p className="text-xs text-gray-500 mt-2">
         * Press Enter to add. Custom skills are allowed.
      </p>
    </div>
  );
};