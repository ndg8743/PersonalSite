import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransitions = ({ children }) => {
    const location = useLocation();

    const variants = {
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div
                key={location.key}
                initial="initial"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransitions;