import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url) return;
        navigate("/results", { state: { url } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden animate-gradient-x">
            {/* background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-teal-500/5 animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-bounce opacity-30"></div>
                <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>
            
            {/* Grid */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/&gt;%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50 animate-slide-grid"></div>            
            <div className="relative z-10 flex items-center justify-center min-h-screen p-6 animate-fade-in">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-12 animate-slide-down">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl border border-white/10 mb-6 transition-all duration-200 hover:scale-110 hover:rotate-12 animate-bounce-gentle">
                            <svg className="w-8 h-8 text-white transition-all duration-150 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-3 animate-text-shimmer">
                            HTML PARSER
                        </h1>
                        <p className="text-white/60 text-lg transition-all duration-150 hover:text-white/80 animate-slide-up" style={{animationDelay: '0.1s'}}>Extract and analyze web content with ease</p>
                        <div className="flex items-center justify-center mt-4 animate-scale-in" style={{animationDelay: '0.2s'}}>
                            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    
                    {/* card */}
                    <form
                        onSubmit={handleSubmit}
                        className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/20 overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-3xl animate-slide-up"
                        style={{animationDelay: '0.15s'}}
                    >
                        {/* Card background effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-teal-500/5 animate-pulse"></div>
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-float"></div>
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-teal-500/10 rounded-full blur-2xl animate-float-delayed"></div>
                        
                        <div className="relative z-10 space-y-6">
                            {/* Input */}
                            <div className="space-y-4 animate-slide-up" style={{animationDelay: '0.25s'}}>
                                <label className="block text-white/80 text-sm font-medium transition-all duration-150 hover:text-white">Website URL</label>
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-200"></div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-white/40 transition-all duration-150 group-hover:text-white/60 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="https://example.com"
                                            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-150 hover:bg-white/10 focus:scale-105"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 relative overflow-hidden group animate-slide-up"
                                style={{animationDelay: '0.3s'}}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300"></div>
                                <span className="relative flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5 transition-all duration-150 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    PARSE WEBSITE
                                </span>
                            </button>
                            
                            {/* list */}
                            <div className="pt-6 border-t border-white/10 animate-slide-up" style={{animationDelay: '0.35s'}}>
                                <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                                    <div className="flex items-center gap-2 transition-all duration-150 hover:text-white/80 hover:scale-105 animate-slide-in-stagger" style={{animationDelay: '0.4s'}}>
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span>Fast parsing</span>
                                    </div>
                                    <div className="flex items-center gap-2 transition-all duration-150 hover:text-white/80 hover:scale-105 animate-slide-in-stagger" style={{animationDelay: '0.45s'}}>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                        <span>Clean output</span>
                                    </div>
                                    <div className="flex items-center gap-2 transition-all duration-150 hover:text-white/80 hover:scale-105 animate-slide-in-stagger" style={{animationDelay: '0.5s'}}>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                        <span>Secure</span>
                                    </div>
                                    <div className="flex items-center gap-2 transition-all duration-150 hover:text-white/80 hover:scale-105 animate-slide-in-stagger" style={{animationDelay: '0.55s'}}>
                                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                                        <span>No limits</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    
                    {/* Footer */}
                    <div className="mt-8 text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
                        <a
                            href="https://github.com/d3zon1x"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-all duration-200 group transform hover:scale-105"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-30 transition duration-150"></div>
                                <svg className="relative w-5 h-5 group-hover:scale-110 transition-transform duration-150" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </div>
                            <span className="text-sm font-medium">Created by d3zon1x</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
