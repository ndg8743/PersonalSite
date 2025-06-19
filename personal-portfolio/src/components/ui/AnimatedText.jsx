import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ text }) => {
    const letters = Array.from(text);

    return (
        <div className="flex">
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-2xl font-bold text-gray-800"
                >
                    {letter}
                </motion.span>
            ))}
        </div>
    );
};

export default AnimatedText;