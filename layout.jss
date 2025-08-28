import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Sparkles, User, Home, Mail } from "lucide-react";
import { User as UserEntity } from "@/entities/User";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
    const location = useLocation();
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const currentUser = await UserEntity.me();
            setUser(currentUser);
        } catch (error) {
            setUser(null);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await UserEntity.logout();
        setUser(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black flex items-center justify-center">
                <div className="flex items-center gap-3 text-white">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                    <span className="text-lg">Loading Aurora Reads...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black">
            <style>{`
                :root {
                    --primary-gold: #F7DC6F;
                    --secondary-gold: #D4AC0D; 
                    --deep-space: #0F0F23;
                    --cosmic-purple: #2E1065;
                    --star-white: #F8F9FA;
                }
                
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
                
                .star-field {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                }
                
                .star {
                    position: absolute;
                    background: white;
                    border-radius: 50%;
                    animation: twinkle 3s infinite;
                }
                
                .star:nth-child(1) { width: 1px; height: 1px; top: 20%; left: 10%; animation-delay: 0s; }
                .star:nth-child(2) { width: 2px; height: 2px; top: 80%; left: 20%; animation-delay: 1s; }
                .star:nth-child(3) { width: 1px; height: 1px; top: 40%; left: 70%; animation-delay: 2s; }
                .star:nth-child(4) { width: 1px; height: 1px; top: 10%; left: 80%; animation-delay: 0.5s; }
                .star:nth-child(5) { width: 2px; height: 2px; top: 70%; left: 90%; animation-delay: 1.5s; }
                .star:nth-child(6) { width: 1px; height: 1px; top: 30%; left: 40%; animation-delay: 2.5s; }
                .star:nth-child(7) { width: 1px; height: 1px; top: 90%; left: 60%; animation-delay: 0.8s; }
                .star:nth-child(8) { width: 2px; height: 2px; top: 60%; left: 30%; animation-delay: 3s; }
            `}</style>

            <div className="star-field">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
            </div>

            <nav className="relative z-10 border-b border-purple-800/30 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to={createPageUrl("Home")} className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-purple-950" />
                            </div>
                            <span className="text-xl font-serif text-white">Aurora Reads</span>
                        </Link>

                        <div className="flex items-center gap-6">
                            {user ? (
                                <>
                                    <Link 
                                        to={createPageUrl("Dashboard")}
                                        className={`flex items-center gap-2 text-sm transition-colors ${
                                            currentPageName === "Dashboard" ? "text-yellow-400" : "text-gray-300 hover:text-white"
                                        }`}
                                    >
                                        <User className="w-4 h-4" />
                                        Dashboard
                                    </Link>
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={handleLogout}
                                        className="text-gray-300 hover:text-white hover:bg-purple-900/30"
                                    >
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <Button 
                                    onClick={() => UserEntity.login()}
                                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-purple-950 hover:from-yellow-500 hover:to-yellow-700 font-medium"
                                >
                                    Sign In
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10">
                {children}
            </main>
        </div>
    );
}
