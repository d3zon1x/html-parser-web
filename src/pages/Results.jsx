import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import "../App.css"

function domToString(node, level = 0) {
    if (!node) return "";
    const indent = "  ".repeat(level);
    let result = `${indent}<${node.tag}>`;

    if (node.text) {
        result += " " + node.text;
    }

    if (node.children && node.children.length > 0) {
        result += "\n";
        node.children.forEach((child) => {
            result += domToString(child, level + 1) + "\n";
        });
        result += `${indent}</${node.tag}>`;
    } else {
        result += `</${node.tag}>`;
    }

    return result;
}

function Results() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { url } = state || {};
    const [dom, setDom] = useState(null);
    const [tag, setTag] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchDom = async () => {
            try {
                setLoading(true);
                const res = await fetch("http://127.0.0.1:8000/parse", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url }),
                });
                const data = await res.json();
                setDom(data.dom);
            } catch (err) {
                console.error("Error fetching DOM:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDom();
    }, [url]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!tag.trim()) return;
        
        try {
            setSearching(true);
            const res = await fetch("http://127.0.0.1:8000/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, tag }),
            });
            const data = await res.json();
            setResults(data.results);
        } catch (err) {
            console.error("Error searching tag:", err);
        } finally {
            setSearching(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden animate-gradient-x">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-teal-500/5 animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-bounce opacity-30"></div>
            </div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/&gt;%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50 animate-slide-grid"></div>

            <div className="relative z-10 p-6 animate-fade-in">
                {/* Header */}
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8 animate-slide-down">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => navigate('/')}
                                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-all duration-200 group transform hover:scale-105 hover:-translate-x-1"
                            >
                                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="font-medium">Back to Home</span>
                            </button>
                            <div className="w-px h-6 bg-white/20 animate-scale-in"></div>
                            <div className="animate-slide-right">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-text-shimmer">
                                    Parsing Results
                                </h1>
                                <p className="text-white/60 text-sm truncate max-w-md transition-all duration-150 hover:text-white/80">{url}</p>
                            </div>
                        </div>
                        
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-xl rounded-xl border border-white/10 animate-bounce-gentle">
                            <svg className="w-6 h-6 text-green-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Conditional Layout - Expanded vs Normal */}
                    <div className={`transition-all duration-400 ease-in-out ${isExpanded ? 'animate-expand-full' : 'animate-expand-normal'}`}>
                        {isExpanded ? (
                            /* Expanded DOM View - Full Width */
                            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-400 animate-slide-up">
                                {/* Card background effects */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-teal-500/5 animate-pulse"></div>
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-float"></div>
                                
                                <div className="relative z-10 p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3 animate-slide-right">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:rotate-12">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white animate-text-shimmer">DOM Structure - Expanded View</h2>
                                                <p className="text-white/60 text-sm transition-all duration-150 hover:text-white/80">Full website structure analysis</p>
                                            </div>
                                        </div>
                                        
                                        <button
                                            onClick={() => setIsExpanded(!isExpanded)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-xl border border-white/10 text-white/80 hover:text-white transition-all duration-200 hover:scale-110 hover:rotate-3 group animate-slide-left"
                                        >
                                            <svg className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} group-hover:rotate-360`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                            </svg>
                                            <span className="font-medium">
                                                {isExpanded ? 'Collapse' : 'Expand'} DOM
                                            </span>
                                        </button>
                                    </div>
                                    
                                    <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-200 hover:shadow-2xl">
                                        <div className="h-[80vh] overflow-y-auto">
                                            {loading ? (
                                                <div className="flex items-center justify-center h-full animate-pulse-gentle">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                        <span className="text-white/60 animate-fade-in-out">Parsing DOM...</span>
                                                    </div>
                                                </div>
                                            ) : dom ? (
                                                <div className="animate-fade-in-up">
                                                    <CopyBlock
                                                        text={domToString(dom)}
                                                        language="html"
                                                        theme={dracula}
                                                        wrapLines
                                                        codeBlock
                                                    />
                                                </div>
                                            ) : (
                                                <div className="p-6 text-center animate-shake">
                                                    <p className="text-red-400">Failed to parse DOM</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Normal Two-Column Layout */
                            <div className="grid lg:grid-cols-2 gap-8 animate-slide-up">
                                {/* DOM Structure */}
                                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-3xl animate-slide-in-left">
                                    {/* Card background effects */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-teal-500/5 animate-pulse"></div>
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-float"></div>
                                    
                                    <div className="relative z-10 p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3 animate-slide-right">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:rotate-12">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-bold text-white animate-text-shimmer">DOM Structure</h2>
                                                    <p className="text-white/60 text-sm transition-all duration-150 hover:text-white/80">Parsed website structure</p>
                                                </div>
                                            </div>
                                            
                                            <button
                                                onClick={() => setIsExpanded(!isExpanded)}
                                                className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-lg border border-white/10 text-white/80 hover:text-white transition-all duration-200 hover:scale-110 hover:rotate-3 group animate-slide-left"
                                            >
                                                <svg className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} group-hover:rotate-360`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                                </svg>
                                                <span className="text-xs font-medium">Expand</span>
                                            </button>
                                        </div>
                                        
                                        <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-200 hover:shadow-2xl">
                                            <div className="max-h-[500px] overflow-y-auto">
                                                {loading ? (
                                                    <div className="flex items-center justify-center p-12 animate-pulse-gentle">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                            <span className="text-white/60 animate-fade-in-out">Parsing DOM...</span>
                                                        </div>
                                                    </div>
                                                ) : dom ? (
                                                    <div className="animate-fade-in-up">
                                                        <CopyBlock
                                                            text={domToString(dom)}
                                                            language="html"
                                                            theme={dracula}
                                                            wrapLines
                                                            codeBlock
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="p-6 text-center animate-shake">
                                                        <p className="text-red-400">Failed to parse DOM</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Search Section */}
                                <div className="space-y-6 animate-slide-in-right">
                                    {/* Search Form */}
                                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-3xl">
                                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-green-500/5 to-blue-500/5 animate-pulse"></div>
                                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-teal-500/10 to-green-500/10 rounded-full blur-2xl animate-float-delayed"></div>
                                        
                                        <div className="relative z-10 p-6">
                                            <div className="flex items-center gap-3 mb-6 animate-slide-right">
                                                <div className="w-10 h-10 bg-gradient-to-br from-teal-500/20 to-green-500/20 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:rotate-12">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-bold text-white animate-text-shimmer">Tag Search</h2>
                                                    <p className="text-white/60 text-sm transition-all duration-150 hover:text-white/80">Search for specific HTML tags</p>
                                                </div>
                                            </div>
                                            
                                            <form onSubmit={handleSearch} className="space-y-4">
                                                <div className="relative group animate-slide-up">
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-200"></div>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                            <svg className="w-5 h-5 text-white/40 transition-all duration-150 group-hover:text-white/60 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 0l4 16M6 9h14M4 15h14" />
                                                            </svg>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter tag (e.g. p, h1, div)"
                                                            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all duration-150 hover:bg-white/10 focus:scale-105"
                                                            value={tag}
                                                            onChange={(e) => setTag(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <button
                                                    type="submit"
                                                    disabled={searching || !tag.trim()}
                                                    className="w-full bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 relative overflow-hidden group disabled:cursor-not-allowed disabled:hover:scale-100 animate-slide-up"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300"></div>
                                                    <span className="relative flex items-center justify-center gap-2">
                                                        {searching ? (
                                                            <>
                                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                                <span className="animate-pulse">SEARCHING...</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg className="w-5 h-5 transition-all duration-150 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                                </svg>
                                                                SEARCH TAGS
                                                            </>
                                                        )}
                                                    </span>
                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                    {/* Search Results */}
                                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-3xl">
                                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5 animate-pulse"></div>
                                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl animate-float-reverse"></div>
                                        
                                        <div className="relative z-10 p-6">
                                            <div className="flex items-center gap-3 mb-6 animate-slide-right">
                                                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:rotate-12">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-bold text-white animate-text-shimmer">Search Results</h2>
                                                    <p className="text-white/60 text-sm transition-all duration-150 hover:text-white/80">
                                                        {results.length > 0 ? `${results.length} result${results.length !== 1 ? 's' : ''} found` : 'No results yet'}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-4 max-h-[400px] overflow-y-auto transition-all duration-200 hover:shadow-2xl">
                                                {results.length > 0 ? (
                                                    <ul className="space-y-3">
                                                        {results.map((result, i) => (
                                                            <li key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-150 hover:scale-102 animate-slide-in-stagger" style={{animationDelay: `${i * 0.05}s`}}>
                                                                <div className="w-6 h-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-150 hover:scale-110 hover:rotate-12">
                                                                    <span className="text-xs font-bold text-white">{i + 1}</span>
                                                                </div>
                                                                <span className="text-white/90 break-words transition-all duration-150 hover:text-white">{result}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className="text-center py-8 animate-fade-in">
                                                        <div className="w-16 h-16 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-150 hover:scale-110 animate-bounce-gentle">
                                                            <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                            </svg>
                                                        </div>
                                                        <p className="text-white/60 transition-all duration-150 hover:text-white/80">Enter a tag and click search to see results</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Results;
