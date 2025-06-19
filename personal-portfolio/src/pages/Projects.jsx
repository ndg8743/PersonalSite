import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code2, Database, Globe, Server, X } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "QView3D",
      description: "Advanced 3D printer management system with concurrent communication and job scheduling",
      longDescription: "A comprehensive 3D printing management platform that enables concurrent communication with multiple printers, intelligent job prioritization, and real-time monitoring. Built with a modern tech stack for scalability and performance.",
      tech: ["Python", "Vue.js", "Flask", "SQLite", "WebSockets", "USB Serial"],
      category: "fullstack",
      image: "/api/placeholder/600/400",
      github: "https://github.com/ndg8743/qview3d",
      demo: "https://qview3d-demo.netlify.app",
      features: [
        "Multi-printer concurrent communication",
        "Job prioritization and load balancing", 
        "Real-time status monitoring",
        "G-code file management",
        "Vue3 + Bootstrap frontend"
      ],
      color: "#00ff00"
    },
    {
      id: 2,
      title: "Danmomo",
      description: "AI-powered danmaku video processing with advanced content analysis",
      longDescription: "An intelligent video processing system that analyzes danmaku (bullet comment) content using machine learning algorithms. Provides content filtering, sentiment analysis, and automated moderation capabilities.",
      tech: ["Python", "TensorFlow", "OpenCV", "FastAPI", "Redis", "PostgreSQL"],
      category: "ai",
      image: "/api/placeholder/600/400",
      github: "https://github.com/ndg8743/danmomo",
      demo: "https://danmomo-demo.herokuapp.com",
      features: [
        "AI-powered content analysis",
        "Real-time comment processing",
        "Sentiment analysis and filtering",
        "Automated moderation system",
        "High-performance video processing"
      ],
      color: "#8b5cf6"
    },
    {
      id: 3,
      title: "Fitness Tracker Pro",
      description: "Comprehensive fitness tracking with real-time analytics and progress visualization",
      longDescription: "A full-featured fitness tracking application that monitors workouts, nutrition, and progress with beautiful data visualizations and personalized recommendations.",
      tech: ["React", "Node.js", "MongoDB", "Chart.js", "Express", "JWT"],
      category: "fullstack", 
      image: "/api/placeholder/600/400",
      github: "https://github.com/ndg8743/fitness-tracker",
      demo: "https://fitness-tracker-pro.netlify.app",
      features: [
        "Workout planning and tracking",
        "Nutrition monitoring",
        "Progress analytics with charts",
        "Social features and challenges",
        "Mobile-responsive design"
      ],
      color: "#00d4ff"
    },
    {
      id: 4,
      title: "LCCJS Framework",
      description: "Lightweight component-based JavaScript framework for rapid development",
      longDescription: "A minimalist JavaScript framework designed for building dynamic web applications with a component-based architecture. Focuses on simplicity and performance.",
      tech: ["JavaScript", "HTML5", "CSS3", "Webpack", "Babel", "Jest"],
      category: "framework",
      image: "/api/placeholder/600/400", 
      github: "https://github.com/ndg8743/lccjs",
      demo: "https://lccjs-framework.github.io",
      features: [
        "Component-based architecture",
        "Virtual DOM implementation",
        "State management system",
        "Built-in routing",
        "Comprehensive testing suite"
      ],
      color: "#ff6b35"
    },
    {
      id: 5,
      title: "Git Learning Tool", 
      description: "Interactive platform for learning Git version control with hands-on exercises",
      longDescription: "An educational tool that teaches Git through interactive tutorials and practical exercises. Features a simulated Git environment for safe learning.",
      tech: ["TypeScript", "React", "Node.js", "Express", "D3.js", "Monaco Editor"],
      category: "education",
      image: "/api/placeholder/600/400",
      github: "https://github.com/ndg8743/git-learning-tool",
      demo: "https://learn-git-interactive.netlify.app",
      features: [
        "Interactive Git simulation",
        "Step-by-step tutorials",
        "Visual branch representation",
        "Code editor integration",
        "Progress tracking"
      ],
      color: "#ffdd48"
    },
    {
      id: 6,
      title: "Sous Recipe App",
      description: "Smart cooking assistant with recipe management and meal planning",
      longDescription: "A comprehensive cooking application that helps users discover, save, and organize recipes with intelligent meal planning and shopping list generation.",
      tech: ["React Native", "Firebase", "Redux", "Expo", "Node.js", "Express"],
      category: "mobile",
      image: "/api/placeholder/600/400",
      github: "https://github.com/ndg8743/sous-app",
      demo: "https://sous-recipe-app.expo.dev",
      features: [
        "Recipe discovery and search",
        "Meal planning calendar",
        "Shopping list generation",
        "Cooking timer and instructions",
        "Cross-platform mobile app"
      ],
      color: "#e91e63"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: <Globe className="w-4 h-4" /> },
    { id: 'fullstack', label: 'Full Stack', icon: <Code2 className="w-4 h-4" /> },
    { id: 'ai', label: 'AI/ML', icon: <Database className="w-4 h-4" /> },
    { id: 'framework', label: 'Framework', icon: <Server className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <Code2 className="w-4 h-4" /> },
    { id: 'mobile', label: 'Mobile', icon: <Globe className="w-4 h-4" /> }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            My Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of projects showcasing my skills in full-stack development, 
            AI/ML, and system architecture. Each project solves real-world problems 
            with modern technologies.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                filter === category.id
                  ? 'bg-terminal-green text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="project-card group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-t-xl mb-4">
                  <div 
                    className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                    style={{ backgroundColor: `${project.color}20` }}
                  >
                    <Code2 className="w-16 h-16" style={{ color: project.color }} />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">View Details</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-terminal-green transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-1 text-gray-400 hover:text-terminal-green transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-1 text-gray-400 hover:text-neon-blue transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 
                    className="text-3xl font-bold"
                    style={{ color: selectedProject.color }}
                  >
                    {selectedProject.title}
                  </h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div 
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: selectedProject.color }}
                          />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </a>
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;