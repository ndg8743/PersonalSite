import React from 'react';

const Skills = () => {
    const skills = [
        { name: 'JavaScript', level: 'Expert' },
        { name: 'React', level: 'Expert' },
        { name: 'Tailwind CSS', level: 'Intermediate' },
        { name: 'Node.js', level: 'Intermediate' },
        { name: 'HTML & CSS', level: 'Expert' },
        { name: 'Git & GitHub', level: 'Intermediate' },
    ];

    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-10">My Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skill, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <h3 className="text-2xl font-semibold">{skill.name}</h3>
                            <p className="text-gray-600">{skill.level}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;