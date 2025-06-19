import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
    const projects = [
        {
            title: 'Project One',
            description: 'A brief description of Project One.',
            link: '#',
        },
        {
            title: 'Project Two',
            description: 'A brief description of Project Two.',
            link: '#',
        },
        {
            title: 'Project Three',
            description: 'A brief description of Project Three.',
            link: '#',
        },
    ];

    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center mb-10">My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h3 className="text-xl font-semibold">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                            <a href={project.link} className="text-blue-500 hover:underline mt-4 inline-block">
                                View Project
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;