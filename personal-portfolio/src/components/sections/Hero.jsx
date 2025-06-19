import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <div className="text-center">
                <motion.h1 
                    className="text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Welcome to My Portfolio
                </motion.h1>
                <motion.p 
                    className="text-lg mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Showcasing my work, skills, and experiences.
                </motion.p>
                <motion.button 
                    className="px-6 py-3 bg-white text-blue-500 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    View My Work
                </motion.button>
            </div>
        </section>
    );
};

export default Hero;