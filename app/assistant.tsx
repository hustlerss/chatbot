"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import {
  useChatRuntime,
  AssistantChatTransport,
} from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

// Custom Header Component
function CustomHeader() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    setShowMenu(false);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xl font-light tracking-tight text-white">
              STARTUP<span className="font-semibold text-blue-400">SENSEI</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === '/' ? 'text-blue-400' : 'text-slate-300'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/questionnaire" 
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === '/questionnaire' ? 'text-blue-400' : 'text-slate-300'
              }`}
            >
              Feasibility Analysis
            </Link>
            <Link 
              href="/chat" 
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === '/chat' ? 'text-blue-400' : 'text-slate-300'
              }`}
            >
              AI Mentor
            </Link>
            <Link 
              href="/community" 
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                pathname === '/community' ? 'text-blue-400' : 'text-slate-300'
              }`}
            >
              Community
            </Link>
          </nav>

          {/* User/Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm hidden md:block">👋 {user.username}</span>
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl border border-slate-700 p-2">
                    <div className="p-2 text-xs text-slate-400 border-b border-slate-700">
                      Signed in as<br/>
                      <span className="text-white">{user.email}</span>
                    </div>
                    <Link 
                      href="/profile" 
                      className="block p-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                      onClick={() => setShowMenu(false)}
                    >
                      👤 My Profile
                    </Link>
                    <Link 
                      href="/reports" 
                      className="block p-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                      onClick={() => setShowMenu(false)}
                    >
                      📊 My Reports
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left p-2 text-sm text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login"
                  className="text-sm text-slate-300 hover:text-blue-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/login"
                  className="btn-premium px-4 py-2 rounded-lg text-sm font-medium text-white"
                >
                  Get Started
                </Link>
              </div>
            )}
            <span className="text-green-400 text-sm hidden md:block">● LIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export const Assistant = () => {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/chat",
    }),
  });

  const quickQuestions = [
    "How do I validate my business idea?",
    "What should I include in my pitch deck?",
    "How much funding should I raise for a seed round?",
    "What's the best way to find co-founders?",
    "How do I protect my intellectual property?",
    "What metrics should early-stage startups track?"
  ];

  // Function to handle quick question selection
  const handleQuickQuestion = (question: string) => {
    // This would need to be integrated with the Thread component
    // For now, we'll log it and you can implement the integration
    console.log("Quick question selected:", question);
    
    // If Thread component has a method to set input, you can call it here
    // For example: threadRef.current?.setInput(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-blue-900">
      {/* Add the Custom Header */}
      <CustomHeader />
      
      <div className="py-8">
        <AssistantRuntimeProvider runtime={runtime}>
          <div className="max-w-6xl mx-auto px-4">
            {/* Page Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <h1 className="text-3xl font-light text-white">AI STARTUP MENTOR</h1>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-slate-400 text-sm terminal-text">
                GET INSTANT STARTUP ADVICE FROM AI
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar - Quick Questions */}
              <div className="lg:col-span-1">
                <div className="glass-card p-6 rounded-xl border-slate-700 sticky top-32">
                  <h3 className="text-white font-medium mb-4 text-sm">QUICK QUESTIONS</h3>
                  <div className="space-y-3">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="w-full text-left p-3 text-xs text-slate-300 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors border border-slate-600 hover:border-blue-500"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-700">
                    <h4 className="text-white font-medium mb-3 text-sm">AREAS I CAN HELP WITH</h4>
                    <div className="space-y-2 text-xs text-slate-400">
                      <div className="flex items-center">
                        <span className="text-green-400 mr-2">●</span>
                        Business Validation
                      </div>
                      <div className="flex items-center">
                        <span className="text-blue-400 mr-2">●</span>
                        Funding & Finance
                      </div>
                      <div className="flex items-center">
                        <span className="text-purple-400 mr-2">●</span>
                        Product Development
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-2">●</span>
                        Legal & Compliance
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Chat Area */}
              <div className="lg:col-span-3">
                <div className="glass-card rounded-xl border-slate-700 h-[600px] flex flex-col">
                  <SidebarProvider>
                    <div className="flex-1 overflow-hidden flex flex-col">
                      {/* Custom Header for Chat */}
                      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-700 px-4">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4 bg-slate-600" />
                        <Breadcrumb>
                          <BreadcrumbList>
                            <BreadcrumbItem>
                              <BreadcrumbPage className="text-white text-sm">Startup Mentor Chat</BreadcrumbPage>
                            </BreadcrumbItem>
                          </BreadcrumbList>
                        </Breadcrumb>
                      </header>
                      
                      {/* Thread Component */}
                      <div className="flex-1 overflow-hidden">
                        <Thread 
                          // You can pass custom styling props to Thread if supported
                        />
                      </div>
                    </div>
                  </SidebarProvider>
                </div>

                {/* Tips Section */}
                {/* <div className="glass-card p-4 rounded-xl border-slate-700 mt-6">
                  <div className="grid md:grid-cols-3 gap-4 text-xs text-slate-400">
                    <div className="text-center">
                      <div className="text-blue-400 mb-1">🎯</div>
                      <div>Be specific about your industry</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 mb-1">💡</div>
                      <div>Ask follow-up questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 mb-1">⚡</div>
                      <div>Use quick questions to start</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Status */}
            <div className="text-center mt-8 text-slate-500 text-xs terminal-text">
              <div>AI MENTOR: ONLINE | SECURE | READY TO HELP</div>
            </div>
          </div>
        </AssistantRuntimeProvider>
      </div>
    </div>
  );
};