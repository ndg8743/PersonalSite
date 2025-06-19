import React, { useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const ScrollAnimations = () => {
    const { ref, isVisible } = useScrollAnimation();

    useEffect(() => {
        if (isVisible) {
            // Add your animation logic here
            console.log('Element is visible, trigger animations');
        }
    }, [isVisible]);

    return (
        <div ref={ref} className="transition-transform duration-500 ease-in-out transform">
            {/* Content that will have scroll animations */}
            <h2 className="text-2xl font-bold">Scroll Down for More</h2>
            <p className="mt-4">This content will animate as you scroll.</p>
        </div>
    );
};

export default ScrollAnimations;