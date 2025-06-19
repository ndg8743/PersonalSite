import React from 'react';

const Button = ({ children, onClick, className, type = 'button' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;