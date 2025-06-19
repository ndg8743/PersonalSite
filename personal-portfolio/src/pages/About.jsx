import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Server, Code2, Award, Calendar, MapPin } from 'lucide-react';

const About = () => {
  const experiences = [
    {
      title: "Teaching Assistant & Graduate Lab Manager",
      organization: "SUNY New Paltz - Computer Science Department",
      period: "2023 - Present",
      description: "Managing CS lab SH 260, assisting professors with curriculum development, and supporting students through complex programming concepts. Built and maintained lab infrastructure including ML servers and distributed computing clusters.",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "#00ff00"
    },
    {
      title: "Systems Administrator",
      organization: "Personal Homelab",
      period: "2020 - Present", 
      description: "Built and manage a multi-node infrastructure including high-performance desktops, Raspberry Pi clusters, and Mac M1 systems for LLM inference, distributed computing, and virtual machine hosting.",
      icon: <Server className="w-6 h-6" />,
      color: "#00d4ff"
    },
    {
      title: "Full-Stack Developer",
      organization: "Freelance & Personal Projects",
      period: "2019 - Present",
      description: "Developed web applications using Vue.js, React, Node.js, and Python. Created educational tools, game development projects, and productivity applications with focus on clean UX and scalable architecture.",
      icon: <Code2 className="w-6 h-6" />,
      color: "#8b5cf6"
    }
  ];

  const skills = [
    { name: "JavaScript/TypeScript", level: 95, color: "#f7df1e" },
    { name: "Python", level: 90, color: "#3776ab" },
    { name: "Vue.js/React", level: 95, color: "#4fc08d" },
    { name: "Node.js", level: 85, color: "#339933" },
    { name: "Go", level: 80, color: "#00add8" },
    { name: "Docker/Kubernetes", level: 85, color: "#2496ed" },
    { name: "AWS/Cloud", level: 80, color: "#ff9900" },
    { name: "Database Design", level: 90, color: "#336791" }
  ];

  const achievements = [
    {
      title: "Graduate Teaching Assistant",
      description: "Selected to assist with CS curriculum and lab management",
      year: "2023",
      icon: <Award className="w-5 h-5" />
    },
    {
      title: "Open Source Contributor",
      description: "Active contributor to QView3D and other open source projects",
      year: "2022",
      icon: <Code2 className="w-5 h-5" />
    },
    {
      title: "Infrastructure Designer",
      description: "Built and manage personal multi-node computing cluster",
      year: "2021",
      icon: <Server className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            About Me
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate Computer Science graduate student and Teaching Assistant at SUNY New Paltz, 
            with a deep love for building scalable systems, managing infrastructure, and creating 
            educational tools that make complex concepts accessible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Left Column - Personal Info & Skills */}
          <div className="space-y-12">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-terminal-green">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-neon-blue" />
                  <span className="text-gray-300">Age: 23 years old</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-electric-purple" />
                  <span className="text-gray-300">Location: New Paltz, NY</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-cyber-orange" />
                  <span className="text-gray-300">Education: M.S. Computer Science (In Progress)</span>
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-neon-blue">
                Technical Skills
              </h2>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-electric-purple">
                Key Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-900/50 rounded-lg">
                    <div className="text-terminal-green mt-1">
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{achievement.title}</h3>
                      <p className="text-gray-300 text-sm">{achievement.description}</p>
                      <span className="text-xs text-gray-500">{achievement.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Experience Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-8 text-cyber-orange">
                Professional Experience
              </h2>
              
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className="relative pl-8 border-l-2 border-gray-700 last:border-l-0"
                  >
                    <div 
                      className="absolute -left-4 p-2 rounded-full border-2 border-gray-700"
                      style={{ backgroundColor: 'black', borderColor: exp.color }}
                    >
                      <div style={{ color: exp.color }}>
                        {exp.icon}
                      </div>
                    </div>
                    
                    <div className="pb-8">
                      <h3 
                        className="text-xl font-bold mb-1"
                        style={{ color: exp.color }}
                      >
                        {exp.title}
                      </h3>
                      <p className="text-gray-300 font-medium mb-2">
                        {exp.organization}
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        {exp.period}
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Philosophy */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="glass rounded-2xl p-8 mt-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-terminal-green">
                My Philosophy
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I believe technology should be accessible, reliable, and purposeful. 
                  Every line of code I write and every system I design is guided by 
                  the principle of creating meaningful impact.
                </p>
                <p>
                  As an educator, I'm passionate about demystifying complex concepts 
                  and helping students build confidence in their technical abilities. 
                  Teaching has taught me that the best solutions are often the simplest ones.
                </p>
                <p>
                  Whether I'm building distributed systems, managing infrastructure, 
                  or developing web applications, I approach each challenge with curiosity, 
                  persistence, and a commitment to continuous learning.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;