import { useEffect } from 'react';
import { gsap } from 'gsap';

// Function to handle fade-in animations
export const fadeIn = (element) => {
    gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1 });
};

// Function to handle slide-in animations
export const slideIn = (element, direction = 'left') => {
    const distance = direction === 'left' ? -100 : 100;
    gsap.fromTo(element, { x: distance, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
};

// Function to handle scale animations
export const scaleUp = (element) => {
    gsap.fromTo(element, { scale: 0 }, { scale: 1, duration: 0.5 });
};

// Function to handle exit animations
export const fadeOut = (element) => {
    gsap.to(element, { opacity: 0, duration: 1 });
};

// Function to handle page transitions
export const pageTransition = (element) => {
    gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1 });
};

// Custom hook to trigger animations on component mount
export const useAnimationOnMount = (ref, animationType) => {
    useEffect(() => {
        if (ref.current) {
            switch (animationType) {
                case 'fadeIn':
                    fadeIn(ref.current);
                    break;
                case 'slideIn':
                    slideIn(ref.current);
                    break;
                case 'scaleUp':
                    scaleUp(ref.current);
                    break;
                default:
                    break;
            }
        }
    }, [ref, animationType]);
};