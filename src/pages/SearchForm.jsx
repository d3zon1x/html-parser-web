import { useState } from "react";

function SearchForm({ onSearch }) {
    const [url, setUrl] = useState("");
    const [tag, setTag] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url || !tag) return;

        setIsSearching(true);
        try {
            await onSearch(url, tag);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-3xl animate-slide-up">
            {/* Card background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-teal-500/5 animate-pulse"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-float"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-teal-500/10 rounded-full blur-2xl animate-float-delayed"></div>

            <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 animate-slide-right">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:rotate-12">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-text-shimmer">
                            Search HTML Tags
                        </h2>
                        <p className="text-white/60 transition-all duration-150 hover:text-white/80">Find specific elements in web pages</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* URL Input */}
                    <div className="space-y-3 animate-slide-up" style={{animationDelay: '0.05s'}}>
                        <label className="block text-white/80 text-sm font-medium transition-all duration-150 hover:text-white">
                            Website URL
                        </label>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-200"></div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-white/40 transition-all duration-150 group-hover:text-white/60 group-hover:scale-110"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                        />
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

                    {/* Tag Input */}
                    <div className="space-y-3 animate-slide-up" style={{animationDelay: '0.1s'}}>
                        <label className="block text-white/80 text-sm font-medium transition-all duration-150 hover:text-white">
                            HTML Tag
                        </label>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-200"></div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-white/40 transition-all duration-150 group-hover:text-white/60 group-hover:scale-110"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 20l4-16m2 0l4 16M6 9h14M4 15h14"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter tag (e.g. p, h1, div) - enter 'text' for all text nodes"
                                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all duration-150 hover:bg-white/10 focus:scale-105"
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button
                        type="submit"
                        disabled={isSearching || !url.trim() || !tag.trim()}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 relative overflow-hidden group disabled:cursor-not-allowed disabled:hover:scale-100 animate-slide-up"
                        style={{animationDelay: '0.15s'}}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300"></div>
                        <span className="relative flex items-center justify-center gap-2">
                            {isSearching ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    <span className="animate-pulse">SEARCHING...</span>
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-5 h-5 transition-all duration-150 group-hover:scale-110 group-hover:rotate-12"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    SEARCH TAGS
                                </>
                            )}
                        </span>
                    </button>

                    {/* Feature List */}
                    <div className="pt-6 border-t border-white/10 animate-slide-up" style={{animationDelay: '0.2s'}}>
                        <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                            <div className="flex items-center gap-2 transition-all duration-150 hover:text-white/80 hover:scale-105 animate-slide-in-stagger" style={{animationDelay: '0.25s'}}>
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>Fast search</span>
                            </div>
                            <div className="flex items-center gap-2 transition-all duration-150 hover:text-white/80 hover:scale-105 animate-slide-in-stagger" style={{animationDelay: '0.3s'}}>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                <span>Accurate results</span>
                            </div>
                            <div className="flex items-center gap-2 transition-all duration-150 hover:text-white/80 hover:scale-105 animate-slide-in-stagger" style={{animationDelay: '0.35s'}}>
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                <span>All HTML tags</span>
                            </div>
                            <div className="flex items-center gap-2 transition-all duration-150 hover:text-white/80 hover:scale-105 animate-slide-in-stagger" style={{animationDelay: '0.4s'}}>
                                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                                <span>Live parsing</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SearchForm;
