import React from 'react';
import { useEffect, useRef } from 'react';

const ParallaxEffects = () => {
    const parallaxRef = useRef(null);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (parallaxRef.current) {
            parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={parallaxRef} className="parallax-background">
            {/* Content goes here */}
        </div>
    );
};

export default ParallaxEffects;