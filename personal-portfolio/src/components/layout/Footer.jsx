import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/ndg8743",
      label: "GitHub",
      color: "hover:text-terminal-green"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/nathangopee",
      label: "LinkedIn",
      color: "hover:text-neon-blue"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:ndg8743@gmail.com",
      label: "Email",
      color: "hover:text-cyber-orange"
    }
  ];

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white relative">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <Terminal className="w-8 h-8 text-terminal-green group-hover:animate-pulse" />
              <span className="text-2xl font-mono font-bold group-hover:text-terminal-green transition-colors">
                Nathan Gopee
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Computer Science Graduate Student & Teaching Assistant at SUNY New Paltz. 
              Passionate about building scalable systems and creating educational tools.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors duration-300 ${link.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-terminal-green">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills & Technologies */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neon-blue">
              Technologies
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>JavaScript & TypeScript</li>
              <li>React & Vue.js</li>
              <li>Python & Node.js</li>
              <li>Docker & Kubernetes</li>
              <li>AWS & Cloud Infrastructure</li>
              <li>Database Design</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Nathan Gopee. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>and</span>
              <span className="text-terminal-green font-mono">React</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-terminal-green/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-neon-blue/5 rounded-full blur-3xl animate-pulse" />
      </div>
    </footer>
  );
};

export default Footer;