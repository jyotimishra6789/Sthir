"use client";


import { useEffect, useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import AdviceCard from "@/components/AdviceCard";

export default function AdvicePage() {
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<any>(null);
  const [hydrated, setHydrated] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    body: {
      score,
      answers,
    },
    initialMessages: [
      {
        id: "initial-msg",
        role: "assistant",
        content: "Hi there. I'm your Sthir AI wellness companion. I'm looking at your recent check-in, and I'm here to listen. How are you feeling right now?"
      }
    ]
  });

  useEffect(() => {
    setHydrated(true);
    const storedScore = localStorage.getItem("sthir-score");
    const storedAnswers = localStorage.getItem("sthir-answers");

    if (storedScore && !isNaN(parseInt(storedScore))) {
      setScore(parseInt(storedScore));
    }
    
    if (storedAnswers) {
      try {
        setAnswers(JSON.parse(storedAnswers));
      } catch(e) { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f0f9ff] py-12 px-4 flex flex-col items-center justify-center">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-200 mix-blend-multiply filter blur-[100px] opacity-50 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-200 mix-blend-multiply filter blur-[100px] opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-3xl relative z-10 flex flex-col h-[85vh]">
        <div className="glass-card flex-1 flex flex-col overflow-hidden animate-scale-up border border-white/40 shadow-xl rounded-3xl backdrop-blur-md bg-white/40">
          
          {/* Header */}
          <div className="p-6 border-b border-indigo-100 flex items-center justify-between bg-white/50 backdrop-blur-sm z-20">
            <div className="flex items-center gap-4">
               <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/30">
                 <span className="text-2xl pt-0.5">✨</span>
               </div>
               <div>
                 <h1 className="text-xl font-bold text-slate-800 tracking-tight">AI Wellness Companion</h1>
                 {hydrated && score !== null && (
                   <p className="text-xs font-medium text-slate-500">Wellness Score: <span className="text-indigo-600 font-bold">{score}</span>/50</p>
                 )}
               </div>
            </div>
            <a href="/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 hover:bg-indigo-100 py-2 px-4 rounded-full">
              Back to Dashboard
            </a>
          </div>

          {/* Personalized Advice */}
          <AdviceCard score={score} answers={answers} />
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
            {!hydrated ? (
               <div className="flex justify-center items-center h-full">
                 <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
               </div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-indigo-50 text-slate-700 rounded-tl-sm'
                  }`}>
                    {/* Simple formatting for markdown-like text */}
                    {m.content.split('\n').map((line, i) => (
                      <p key={i} className={`mb-1 last:mb-0 ${m.role === 'user' ? 'text-white/90' : 'text-slate-600'}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            )}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
               <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl p-4 shadow-sm bg-white border border-indigo-50 rounded-tl-sm flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/60 border-t border-indigo-100 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                className="w-full bg-white/80 border border-slate-200 text-slate-800 rounded-full py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm disabled:opacity-50"
                value={input}
                placeholder="Type your message..."
                onChange={handleInputChange}
                disabled={isLoading || !hydrated}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || !hydrated}
                className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
                  <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                </svg>
              </button>
            </form>
            {error && (
              <p className="text-red-500 text-xs mt-2 ml-4">Failed to send message. Please try again.</p>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
