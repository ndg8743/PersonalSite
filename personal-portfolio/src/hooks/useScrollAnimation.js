import { useEffect, useRef } from 'react';

const useScrollAnimation = (animationClass) => {
    const elementRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const element = elementRef.current;
            if (element) {
                const { top, bottom } = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (top < windowHeight && bottom > 0) {
                    element.classList.add(animationClass);
                } else {
                    element.classList.remove(animationClass);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [animationClass]);

    return elementRef;
};

export default useScrollAnimation;