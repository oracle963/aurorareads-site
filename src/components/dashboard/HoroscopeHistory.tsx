import React from 'react';
import { motion } from 'framer-motion';

interface HoroscopeHistoryProps {
    horoscopes: any[];
}

export default function HoroscopeHistory({ horoscopes }: HoroscopeHistoryProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm"
        >
            <h2 className="text-2xl font-serif mb-6">Your Cosmic Journey</h2>
            
            {horoscopes.length === 0 ? (
                <p className="text-center text-purple-200/80 py-8">
                    No horoscopes yet. Request your first reading to begin your journey! ✨
                </p>
            ) : (
                <div className="space-y-4">
                    {horoscopes.map((horoscope, index) => (
                        <div
                            key={horoscope.id || index}
                            className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/20"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-medium text-purple-200">
                                    {horoscope.type} Reading
                                </h3>
                                <span className="text-sm text-purple-300/70">
                                    {new Date(horoscope.created_date).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-purple-100/90 whitespace-pre-line">
                                {horoscope.content}
                            </p>
                            {horoscope.aspects && (
                                <div className="mt-4 pt-4 border-t border-purple-500/20">
                                    <h4 className="text-sm font-medium mb-2 text-purple-200">
                                        Planetary Aspects
                                    </h4>
                                    <div className="text-sm text-purple-300/70">
                                        {horoscope.aspects}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
