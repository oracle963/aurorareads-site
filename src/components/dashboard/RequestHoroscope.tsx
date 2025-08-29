import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RequestHoroscopeProps {
    user: any;
    profile: any;
    onNewHoroscope: () => void;
}

export default function RequestHoroscope({ user, profile, onNewHoroscope }: RequestHoroscopeProps) {
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('daily');

    const handleRequest = async () => {
        setLoading(true);
        try {
            // Here you would typically make an API call to request a new horoscope
            const response = await fetch('/api/horoscopes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type,
                    user_email: user.email,
                    zodiac_sign: profile.zodiac_sign,
                    birth_date: profile.birth_date,
                }),
            });

            if (!response.ok) throw new Error('Failed to generate horoscope');

            onNewHoroscope();
        } catch (error) {
            console.error('Error requesting horoscope:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm"
        >
            <h2 className="text-2xl font-serif mb-6">Request Reading</h2>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm mb-2">Reading Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-purple-900/30 border border-purple-500/30 text-white"
                    >
                        <option value="daily">Daily Reading</option>
                        <option value="weekly">Weekly Forecast</option>
                        <option value="monthly">Monthly Outlook</option>
                        <option value="love">Love Reading</option>
                        <option value="career">Career Guidance</option>
                    </select>
                </div>
                
                <button
                    onClick={handleRequest}
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium 
                        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-700 hover:to-indigo-700'} 
                        transition-colors`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Consulting the Stars...
                        </span>
                    ) : (
                        'Request Reading'
                    )}
                </button>
            </div>
            
            <p className="mt-4 text-sm text-purple-200/60 text-center">
                {type === 'daily' && "Daily readings refresh every 24 hours"}
                {type === 'weekly' && "Weekly forecasts provide a 7-day outlook"}
                {type === 'monthly' && "Monthly readings offer long-term insights"}
                {type === 'love' && "Love readings focus on relationships and emotions"}
                {type === 'career' && "Career guidance aligns with your professional path"}
            </p>
        </motion.div>
    );
}
