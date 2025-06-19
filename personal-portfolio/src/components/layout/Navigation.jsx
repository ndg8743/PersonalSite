import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-xl font-bold text-gray-800">
                    My Portfolio
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-gray-600 hover:text-blue-500 transition duration-300">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-gray-600 hover:text-blue-500 transition duration-300">About</Link>
                    </li>
                    <li>
                        <Link to="/projects" className="text-gray-600 hover:text-blue-500 transition duration-300">Projects</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition duration-300">Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;