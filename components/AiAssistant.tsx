import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { askAiAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hi! I\'m CareerPilot. Having trouble or need a quick tip? Ask me anything!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Position state (default to bottom-right)
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs for drag logic
  const dragStartRef = useRef<{x: number, y: number} | null>(null);
  const hasMovedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Handle Dragging Events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragStartRef.current) {
        const deltaX = e.clientX - dragStartRef.current.x;
        const deltaY = e.clientY - dragStartRef.current.y;
        
        // Mark as moved if displacement is significant (prevents micro-movements from registering as drag)
        if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
             hasMovedRef.current = true;
        }

        setPosition(prev => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY
        }));
        
        dragStartRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Start drag
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    // Only toggle if we haven't dragged the button
    if (!hasMovedRef.current) {
        setIsOpen(!isOpen);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await askAiAssistant(userMsg.text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine chat window position relative to button to keep it on screen
  const isRightSide = position.x > window.innerWidth / 2;
  const isBottomSide = position.y > window.innerHeight / 2;

  return (
    <div 
      style={{ 
        position: 'fixed', 
        left: position.x, 
        top: position.y,
        zIndex: 9999,
        touchAction: 'none'
      }}
      className="flex flex-col items-end"
    >
      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`absolute ${isBottomSide ? 'bottom-16' : 'top-16'} ${isRightSide ? 'right-0' : 'left-0'} 
            w-80 h-96 glass-card bg-slate-900/95 border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in origin-${isBottomSide ? 'bottom' : 'top'}-${isRightSide ? 'right' : 'left'}`}
          onMouseDown={(e) => e.stopPropagation()} // Prevent dragging when interacting with chat
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 flex justify-between items-center shrink-0">
            <div className="flex items-center text-white font-bold">
              <Icons.Logo className="w-5 h-5 mr-2" />
              CareerPilot Support
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <Icons.X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-slate-700 text-gray-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-slate-700 rounded-2xl rounded-tl-none px-3 py-2">
                    <Icons.Loader className="w-4 h-4 text-blue-400 animate-spin" />
                 </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-slate-800/50 border-t border-white/10 shrink-0">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask for help..."
                className="w-full bg-slate-900 border border-slate-600 rounded-full pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit" 
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-1 top-1 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
              >
                <Icons.ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <div 
        onMouseDown={handleMouseDown}
        onClick={handleButtonClick}
        className="cursor-move group relative"
        title="Drag me!"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-75 blur-md group-hover:opacity-100 transition-opacity"></div>
        <button 
          className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg border border-white/20 hover:scale-105 transition-transform"
          type="button"
        >
          {isOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Logo className="w-8 h-8" />}
        </button>
        {!isOpen && (
            <span className="absolute -top-2 -right-2 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-slate-900"></span>
            </span>
        )}
      </div>
    </div>
  );
};