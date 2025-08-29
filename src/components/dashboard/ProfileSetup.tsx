import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProfileSetupProps {
    user: any;
    onComplete: (profile: any) => void;
}

export default function ProfileSetup({ user, onComplete }: ProfileSetupProps) {
    const [formData, setFormData] = useState({
        name: '',
        birth_date: '',
        birth_time: '',
        birth_place: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const zodiacSign = calculateZodiacSign(new Date(formData.birth_date));
            const profile = {
                ...formData,
                zodiac_sign: zodiacSign,
                created_by: user.email
            };
            
            // Here you would typically make an API call to save the profile
            onComplete(profile);
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    const calculateZodiacSign = (date: Date) => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
        return "Pisces";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm"
        >
            <h2 className="text-2xl font-serif mb-6">Complete Your Cosmic Profile</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Your Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-purple-900/30 border border-purple-500/30 text-white"
                        placeholder="Enter your name"
                    />
                </div>
                
                <div>
                    <label className="block text-sm mb-1">Birth Date</label>
                    <input
                        type="date"
                        value={formData.birth_date}
                        onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-purple-900/30 border border-purple-500/30 text-white"
                    />
                </div>
                
                <div>
                    <label className="block text-sm mb-1">Birth Time (optional)</label>
                    <input
                        type="time"
                        value={formData.birth_time}
                        onChange={(e) => setFormData({ ...formData, birth_time: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-purple-900/30 border border-purple-500/30 text-white"
                    />
                </div>
                
                <div>
                    <label className="block text-sm mb-1">Birth Place (optional)</label>
                    <input
                        type="text"
                        value={formData.birth_place}
                        onChange={(e) => setFormData({ ...formData, birth_place: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-purple-900/30 border border-purple-500/30 text-white"
                        placeholder="City, Country"
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors"
                >
                    Begin Your Journey
                </button>
            </form>
        </motion.div>
    );
}
