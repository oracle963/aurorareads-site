import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeSectionProps {
    user: any;
    profile: any;
}

export default function WelcomeSection({ user, profile }: WelcomeSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm"
        >
            <h1 className="text-3xl font-serif mb-2">
                Welcome back, {profile ? profile.name : user.email}
            </h1>
            <p className="text-purple-200/80">
                {profile 
                    ? `Your cosmic journey continues under ${profile.zodiac_sign}` 
                    : "Complete your profile to begin your cosmic journey"}
            </p>
            
            {profile && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="stat-card">
                        <h3>Your Sign</h3>
                        <p>{profile.zodiac_sign} ✨</p>
                    </div>
                    <div className="stat-card">
                        <h3>Birth Date</h3>
                        <p>{new Date(profile.birth_date).toLocaleDateString()}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Lucky Number</h3>
                        <p>{Math.floor(Math.random() * 9) + 1}</p>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
